import { Link, useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/config.js'
import { Button, Container } from '../components/index.js'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Trash, SquarePen, Loader2 } from 'lucide-react';
import { successToast } from '../utils/toast.js'

export default function Post() {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const [isDeleting, setIsDeleting] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const userData = useSelector(
        (state) => state.auth.userData
    )

    const isAuthor = post && userData ? post.userId === userData.$id : false

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug)
                .then((post) => {
                    if (post) {
                        setPost(post)
                    } else {
                        navigate('/')
                    }
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    const deletePost = async () => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this post?'
        )
        if (!confirmDelete) return
        
        setIsDeleting(true)

        const status = await appwriteService.deletePost(post.$id)
        if (status) {
            await appwriteService.deleteFile(post.featuredImage)
            successToast('Post deleted successfully')
            navigate('/')
        }
        setIsDeleting(false)
    }

    if (loading) {
        return (
            <Container>
                <div className='flex justify-center items-center min-h-[75vh]'>
                    <h1 className='text-gray-400 text-3xl font-bold'>
                        Loading post...
                    </h1>
                </div>
            </Container>
        )
    }

    if (!post) return null

    return (
        <Container>
            <div className='mx-auto w-[60%] py-5'>
                <div className='mx-auto max-w-fit'>
                    <div className='mb-6 flex flex-col items-center'>
                        <h1 className='text-4xl font-bold mb-4 text-[#E05C2A] capitalize select-text selection:bg-[#E05C2A] selection:text-white'>{post.title}</h1>
                        <div className='relative inline-block'>
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className='max-h-125 w-auto object-contain rounded-md border border-[#383733]'
                            />
                            {isAuthor && (
                                <div className='absolute top-4 right-4 flex gap-3'>
                                    <Link to={`/edit-post/${post.$id}`}>
                                        <Button className='p-2!' bgColor='bg-green-600' hoverEffect='hover:shadow-[0_0_15px_rgba(34,197,94,0.6)]'><SquarePen /></Button>
                                    </Link>
                                    <Button
                                        className='p-2!'
                                        onClick={deletePost}
                                        disabled={isDeleting}
                                        bgColor='bg-red-500'
                                        hoverEffect='hover:shadow-[0_0_15px_rgba(239,68,68,0.6)]'
                                    >
                                        {isDeleting ? (
                                            <Loader2 className='animate-spin' />
                                        ) : (
                                            <Trash />
                                        )}
                                    </Button>
                                </div>
                            )}  
                        </div>
                    </div>  
                    <div className='text-lg leading-9 text-gray-400 select-text selection:bg-white selection:text-black'>{parse(post.content)}</div>
                </div>
            </div>
        </Container>
    )
}