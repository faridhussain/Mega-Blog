import { Link, useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/config.js'
import { Button, Container } from '../components/index.js'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Trash, SquarePen, Loader2 } from 'lucide-react';
import { successToast } from '../utils/toast.js'

export default function Post() {
    // stores the current post data
    const [post, setPost] = useState(null)
    // get post id from the url
    const { slug } = useParams()
    // controls delete button loading state
    const [isDeleting, setIsDeleting] = useState(false)
    // controls page loading state while fetching post data
    const [loading, setLoading] = useState(true)
    // used for page navigation
    const navigate = useNavigate()
    // get current logged in user from redux store
    const userData = useSelector((state) => state.auth.userData)

    // check if the current user is the author of the post
    // only the author can edit or delete the post
    const isAuthor = post && userData ? post.userId === userData.$id : false

    // fetch post data when page loads
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug)
                .then((post) => {
                    // store fetched post data in state
                    if (post) {
                        setPost(post)
                    // redirect to home page if post does not exist
                    } else {
                        navigate('/')
                    }
                })
                // stop loading after request completes
                .finally(() => {
                    setLoading(false)
                })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    // delete the current post and its featured image
    const deletePost = async () => {
        // ask user for confirmation before deleting
        const confirmDelete = window.confirm('Are you sure you want to delete this post?')
        if (!confirmDelete) return
        // start delete loading state
        setIsDeleting(true)

        // remove post from appwrite database
        const status = await appwriteService.deletePost(post.$id)
        if (status) {
            // remove associated image from storage
            await appwriteService.deleteFile(post.featuredImage)
            // notify user that deletion was successful
            successToast('Post deleted successfully')
            // redirect user to home page after deletion
            navigate('/')
        }
        setIsDeleting(false)
    }

    // show loading state while post data is being fetched
    if (loading) {
        return (
            <Container>
                <div className='flex justify-center items-center min-h-[75vh]'>
                    <h1 className='text-gray-400 text-xl md:text-3xl font-bold text-center px-4'>Loading post...</h1>
                </div>
            </Container>
        )
    }

    // stop rendering if no post is available
    if (!post) return null

    return (
        <Container>
            <div className='mx-auto w-[95%] md:w-[90%] lg:w-[80%] xl:w-[60%] py-5'>
                <div className='w-full'>
                    <div className='mb-6 flex flex-col items-center'>
                        <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-[#E05C2A] capitalize text-center select-text selection:bg-[#E05C2A] selection:text-white'>{post.title}</h1>
                        <div className='relative w-full'>
                            {/* featured image */}
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className='w-full max-h-[70vh] object-contain rounded-md border border-[#383733]'
                            />
                            {/* show edit and delete actions only to the author */}
                            {isAuthor && (
                                <div className='absolute top-3 right-3 flex gap-2 md:gap-3'>
                                    {/* navigate to edit post page */}
                                    <Link to={`/edit-post/${post.$id}`}>
                                        <Button className='p-2!' bgColor='bg-green-600' hoverEffect='hover:shadow-[0_0_15px_rgba(34,197,94,0.6)]'><SquarePen size={20} /></Button>
                                    </Link>
                                    {/* delete current post */}
                                    <Button
                                        className='p-2!'
                                        onClick={deletePost}
                                        disabled={isDeleting}
                                        bgColor='bg-red-500'
                                        hoverEffect='hover:shadow-[0_0_15px_rgba(239,68,68,0.6)]'
                                    >
                                        {isDeleting ? (
                                            <Loader2 className='animate-spin' size={20} />
                                        ) : (
                                            <Trash size={20} />
                                        )}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* render html content created in the editor */}
                    <div className='text-base md:text-lg leading-7 md:leading-9 text-gray-400 select-text selection:bg-white selection:text-black wrap-break-word'>{parse(post.content)}</div>
                </div>
            </div>
        </Container>
    )
}