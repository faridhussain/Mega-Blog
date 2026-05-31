import { Container, PostCard } from '../components/index.js'
import appwriteService from '../appwrite/config.js'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { MoveRight } from 'lucide-react';

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

    if (!authStatus) {
        return (
            <Container>
                <div className='flex flex-col justify-center items-center min-h-[75vh] md:gap-4 gap-2 text-center p-5'>
                    <h1 className='text-white md:text-6xl text-3xl font-black'>Welcome to Mega <span className='text-[#D85828]'>Blog</span></h1>
                    <p className='text-[#6B6760] text-base md:text-xl md:font-medium max-w-xl mb-4'>Write stories, share ideas, and manage your own blog posts.</p>
                    <div className='flex gap-4'>
                        <Link to='/login' className='px-6 bg-[#0E0D09] py-2 border border-[#383733] rounded-md hover:border-[#DB9258] hover:shadow-[0_0_25px_rgba(219,146,88,0.4)] duration-300 md:text-lg text-gray-300 font-semibold hover:-translate-y-0.5 duration-300'>Login</Link>
                        <Link to='/signup' className='px-6 py-2 bg-[#DB9258] font-semibold inline-flex items-center gap-1 rounded-md hover:shadow-[0_0_25px_rgba(219,146,88,0.4)] duration-300 md:text-lg hover:-translate-y-0.5'>Create Account<MoveRight size={16} strokeWidth={3} /></Link>
                    </div>
                </div>
            </Container>
        )
    }

    if (posts.length === 0) {
        return (
            <Container>
                <div className='flex justify-center items-center min-h-[75vh]'>
                    <h1 className='text-gray-300 text-3xl font-bold'>
                        No posts yet. Create your first post!
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