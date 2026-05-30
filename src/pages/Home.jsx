import { Container, PostCard } from '../components/index.js'
import appwriteService from '../appwrite/config.js'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Home() {
    const [posts, setPosts] = useState([])
    const authStatus = useSelector((state) => state.auth.status)
    
    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <Container>
                <div className='flex justify-center items-center min-h-[70vh]'>
                    <h1 className='text-gray-700 text-3xl font-bold'>
                        { authStatus ?  'No posts available!' : 'Login to read posts' }
                    </h1>
                </div>
            </Container>
        )
    }

    return (
        <Container>
            <div className='flex gap-2 flex-wrap p-3'>
                {posts.map((post) => (
                    <PostCard key={post.$id} {...post} />
                ))}
            </div>
        </Container>
    )
}