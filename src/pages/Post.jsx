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
    const userData = useSelector((state) => state.auth.userData)

    const isAuthor = post && userData ? post.userId === userData.$id : false

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                console.log(post)

                if (post) {
                    console.log(appwriteService.getFilePreview(post.featuredImage))
                    setPost(post)
                } else {
                    navigate('/')
                }
            })
        } else navigate('/')
    }, [slug, navigate])

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage)
                navigate('/')
            }
        })
    }

    return (
        post ? (
            <div>
                <Container>
                    <div>
                        <img src={appwriteService.getFilePreview(post.featuredImage)} alt={post.title} />
                        {isAuthor && (
                            <div>
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor='bg-green-600'>Edit</Button>
                                </Link>
                                <Button bgColor='bg-red-500' onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                    <div>
                        <h1>{post.title}</h1>
                    </div>
                    <div>{parse(post.content)}</div>
                </Container>
            </div>
        ) : null
    )
}