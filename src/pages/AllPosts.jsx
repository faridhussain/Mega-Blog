import { Container, PostCard } from '../components/index.js'
import appwriteService from '../appwrite/config.js'
import { useEffect, useState } from 'react'

export default function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    return (
        <div>
            <Container>
                <div>
                    {posts.map((post) => {
                        <div key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    })}
                </div>
            </Container>
        </div>
    )
}