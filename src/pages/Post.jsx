import { Link, useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/config.js'
import { Button, Container } from '../components/index.js'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

export default function Post() {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    const userData = useSelector(
        (state) => state.auth.userData
    )

    const isAuthor = post && userData ? post.userId === userData.$id : false

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                } else {
                    navigate('/')
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage)
                navigate('/')
            }
        })
    }

    return post ? (
        <Container>
            <div className='mx-auto w-[80%] py-10'>
                <div className='relative mb-5 overflow-hidden rounded-xl'>
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className='w-full h-fit object-cover rounded-xl'
                    />
                    {isAuthor && (
                        <div className='absolute top-4 right-4 flex gap-3'>
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor='bg-green-600'> Edit </Button>
                            </Link>
                            <Button bgColor='bg-red-500' onClick={deletePost}>Delete</Button>
                        </div>
                    )}
                </div>  
                <h1 className='text-4xl font-bold mb-8'>{post.title}</h1>
                <div className='text-lg leading-8 text-gray-700'>{parse(post.content)}</div>
            </div>
        </Container>
    ) : null
}