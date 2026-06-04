import { Container, PostCard } from '../components/index.js'
import appwriteService from '../appwrite/config.js'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Query } from 'appwrite'
import { Link } from 'react-router-dom'
import { MoveRight } from 'lucide-react'

export default function MyPosts() {
    // stores all posts created by the current user
    const [posts, setPosts] = useState([])
    // controls loading state while posts are being fetched
    const [loading, setLoading] = useState(true)
    // get current user information from redux store
    const userData = useSelector((state) => state.auth.userData)

    useEffect(() => {
        // stop loading if user data is not available
        if (!userData) {
            setLoading(false)
            return
        }
        // fetch only posts created by the current user
        appwriteService.getPosts({
            queries: [
                Query.equal('userId', userData.$id),
                Query.orderDesc('$createdAt')
            ]
        })
        .then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })

        // stop loading after request completes
        .finally(() => {
            setLoading(false)
        })
    }, [userData])

    // show loading message while posts are being fetched
    if (loading) {
        return (
            <Container>
                <div className='flex justify-center items-center min-h-[75vh] px-4'>
                    <h1 className='text-gray-400 text-xl md:text-3xl font-bold text-center'>Loading your posts...</h1>
                </div>
            </Container>
        )
    }

    // show empty state when user has not created any posts
    if (posts.length === 0) {
        return (
            <Container>
                <div className='flex flex-col justify-center items-center min-h-[75vh] px-4'>
                    <h1 className='text-xl md:text-3xl font-extrabold md:font-black text-gray-300 mb-3 text-center'>You haven't created any posts yet</h1>
                    <p className='text-gray-400 text-center text-sm md:text-lg'>Start writing and publish your first post.</p>
                    {/* quick link to create the first post */}
                    <Link to='/add-post' className='group mt-5 md:px-6 md:py-2 px-4 py-2 bg-[#DB9258] font-bold inline-flex items-center justify-center gap-1 rounded-md hover:shadow-[0_0_25px_rgba(219,146,88,0.4)] duration-300 md:text-lg hover:-translate-y-0.5 max-w-xs'>Create Your First Post<MoveRight className='transition-transform duration-300 group-hover:translate-x-1' size={16} strokeWidth={3} /></Link>
                </div>
            </Container>
        )
    }

    // display all posts created by the current user
    return (
        <Container>
            <div className='columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 p-4'>
                {/* render all user posts */}
                {posts.map((post) => (
                    <PostCard key={post.$id} {...post} showStatus={true}/>
                ))}
            </div>
        </Container>
    )
}