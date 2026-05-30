import { Container, PostCard } from '../components/index.js'
import appwriteService from '../appwrite/config.js'
import { useEffect, useState } from 'react'

export default function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts({ queries: [] }).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <Container>
                <div className='flex justify-center items-center min-h-[70vh]'>
                    <h1 className='text-3xl font-bold text-gray-700'>No posts available!</h1>
                </div>
            </Container>
        )
    }

    return (
        <div>
            <Container>
                <div className='flex flex-wrap gap-2 p-3'>
                    {posts.map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>
            </Container>
        </div>
    )
}