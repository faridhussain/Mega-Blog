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
                <div className='relative'>
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#DB925808_1px,transparent_1px),linear-gradient(to_bottom,#DB925808_1px,transparent_1px)] bg-size-[60px_60px]"></div>
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-[#DB9258]/10 blur-[150px] rounded-full pointer-events-none'></div>
                    <div className='flex flex-col justify-center items-center min-h-[80vh] md:gap-4 gap-2 text-center p-5'>
                        <h1 className='text-white md:text-6xl text-3xl font-black'>Welcome to Mega <span className='text-[#D85828]'>Blog</span></h1>
                        <p className='text-[#6B6760] text-base md:text-xl md:font-medium max-w-xl mb-4'>Write stories, share ideas, and manage your own blog posts.</p>
                        <div className='flex gap-4'>
                            <Link to="/login" className="relative overflow-hidden group px-6 py-2 bg-[#0E0D09] border border-[#383733] rounded-md text-gray-300 font-semibold md:text-lg hover:border-[#db935864] hover:shadow-[0_0_25px_rgba(219,146,88,0.4)] hover:-translate-y-0.5 transition-all duration-300">
                            <span className="absolute top-0 -left-full h-full w-1/3 skew-x-12 bg-linear-to-r from-transparent via-[#DB9258]/50 to-transparent transition-all duration-700 group-hover:left-[130%]"/>
                            <span className="relative z-10">Login</span>
                            </Link>
                            <Link to='/signup' className='group px-6 py-2 bg-[#DB9258] font-semibold inline-flex items-center gap-1 rounded-md hover:shadow-[0_0_25px_rgba(219,146,88,0.4)] duration-300 md:text-lg hover:-translate-y-0.5'>Create Account<MoveRight className='transition-transform duration-300 group-hover:translate-x-1' size={16} strokeWidth={3} /></Link>
                        </div>
                        <div className='flex flex-wrap justify-center gap-2 mt-4'>
                            <div className="relative overflow-hidden group px-4 py-2 font-semibold duration-300 hover:border-[#4a4640] border border-[#383733] rounded-full text-[#8a857d]">
                                <span className="absolute inset-y-0 translate-x-[-200%] w-1/3 skew-x-12 bg-linear-to-r from-transparent via-[#8a857d]/40 to-transparent group-hover:translate-x-[500%] transition-transform duration-700" />
                                <span className="relative z-10">• Rich Text Editor</span>
                            </div>
                            <div className="relative overflow-hidden group px-4 py-2 font-semibold duration-300 hover:border-[#4a4640] border border-[#383733] rounded-full text-[#8a857d]">
                                <span className="absolute inset-y-0 translate-x-[-200%] w-1/3 skew-x-12 bg-linear-to-r from-transparent via-[#8a857d]/40 to-transparent group-hover:translate-x-[500%] transition-transform duration-700" />
                                <span className="relative z-10">• Secure Authentication</span>
                            </div>
                            <div className="relative overflow-hidden group px-4 py-2 font-semibold duration-300 hover:border-[#4a4640] border border-[#383733] rounded-full text-[#8a857d]">
                                <span className="absolute inset-y-0 translate-x-[-200%] w-1/3 skew-x-12 bg-linear-to-r from-transparent via-[#8a857d]/40 to-transparent group-hover:translate-x-[500%] transition-transform duration-700" />
                                <span className="relative z-10">• Fast Publishing</span>
                            </div>
                        </div>
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
            <div className='flex gap-4 flex-wrap p-4'>
                {posts.map((post) => (
                    <PostCard key={post.$id} {...post} />
                ))}
            </div>
        </Container>
    )
}