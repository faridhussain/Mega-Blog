import { Link } from 'react-router-dom'
import { Container } from '../components'
import { MoveLeft } from 'lucide-react'

export default function NotFound() {
    return (
        <Container>
            <div className='flex flex-col items-center justify-center min-h-[75vh] text-center px-4'>
                <h1 className='text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-[#E05C2A] select-none'>
                    404
                </h1>

                <div className='flex items-center gap-2 mt-2'>
                    <div className='w-6 sm:w-8 h-px bg-[#E05C2A]' />
                    <div className='w-2 h-2 rounded-full bg-[#E05C2A]' />
                    <div className='w-6 sm:w-8 h-px bg-[#E05C2A]' />
                </div>

                <h2 className='text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-5'>
                    Page Not Found
                </h2>

                <p className='text-gray-400 mt-3 mb-7 text-base md:text-lg font-medium max-w-md'>
                    The page you're looking for doesn't exist.
                </p>

                <Link
                    to='/'
                    className='group px-6 py-2 bg-[#DB9258] font-bold inline-flex items-center justify-center gap-1 rounded-md hover:shadow-[0_0_25px_rgba(219,146,88,0.4)] duration-300 hover:-translate-y-0.5 uppercase max-w-xs md:w-auto md:text-lg'
                >
                    <MoveLeft
                        className='transition-transform duration-300 group-hover:-translate-x-1'
                        size={16}
                        strokeWidth={3}
                    />
                    go home
                </Link>
            </div>
        </Container>
    )
}