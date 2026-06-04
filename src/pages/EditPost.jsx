import { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config.js'
import { Container, PostForm } from '../components/index.js'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditPost() {
    // stores the post being edited
    const [post, setPost] = useState(null)
    // get post id from the url
    const { slug } = useParams()
    // used to redirect user if post is not found
    const navigate = useNavigate()

    useEffect(() => {
        // fetch post data when page loads
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                // store post data for editing
                if (post) {
                    setPost(post)
                }
            })
        }
        // redirect to home page if no post id is provided
        else {
            navigate('/')
        }
    }, [slug, navigate])

    return (
        post ? (
            <div>
                <Container>
                    {/* reuse postform component in edit mode */}
                    <PostForm post={post} />
                </Container>
            </div>
        ) : (
            <div className='flex justify-center items-center min-h-[75vh]'>
                <h1 className='text-gray-400 md:text-xl font-bold'>Loading post...</h1>
            </div>
        )
    )
}