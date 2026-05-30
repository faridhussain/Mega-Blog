import { Container, PostCard } from '../components/index.js'
import appwriteService from '../appwrite/config.js'
import { useEffect, useState } from 'react'

export default function Home() {
    const [posts, setPosts] = useState([])
    
    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div>
                <Container>
                    <div>
                        <div>
                            <h1>Login to read posts</h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div>
            <Container>
                <div>
                    {posts.map((post) => (
                        <div key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}