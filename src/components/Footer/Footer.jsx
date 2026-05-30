import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <div className='px-10 py-4 border-t-2 border-t-[#E5E3DC] flex justify-between'>
            <div className='flex justify-between flex-col items-center'>
                <h1 className='font-extrabold text-2xl'>Mega Blog</h1>
                <p className='text-sm text-gray-500 font-semibold'>© Copyright {new Date().getFullYear()}. All Rights Reserved by DevUl.</p>
            </div>
            <div className='flex gap-15'>
                <div className='flex flex-col items-center gap-3'>
                    <h3 className='text-lg font-bold text-gray-600'>Company</h3>
                    <div className='flex flex-col items-center gap-1'>
                        <Link to='#' className='duration-300 font-medium hover:text-[#4A6CF7]'>Features</Link>
                        <Link to='#' className='duration-300 font-medium hover:text-[#4A6CF7]'>Pricing</Link>
                        <Link to='#' className='duration-300 font-medium hover:text-[#4A6CF7]'>Affiliate Program</Link>
                        <Link to='#' className='duration-300 font-medium hover:text-[#4A6CF7]'>Press Kit</Link>
                    </div>
                </div>
                <div className='flex flex-col items-center gap-3'>
                    <h3 className='text-lg font-bold text-gray-600'>Support</h3>
                    <div className='flex flex-col items-center gap-1'>
                        <Link to='#' className='duration-300 font-medium hover:text-[#4A6CF7]'>Account</Link>
                        <Link to='#' className='duration-300 font-medium hover:text-[#4A6CF7]'>Help</Link>
                        <Link to='#' className='duration-300 font-medium hover:text-[#4A6CF7]'>Contact</Link>
                        <Link to='#' className='duration-300 font-medium hover:text-[#4A6CF7]'>Customer Support</Link>
                    </div>
                </div>
                <div className='flex flex-col items-center gap-3'>
                    <h3 className='text-lg font-bold text-gray-600'>Legals</h3>
                    <div className='flex flex-col items-center gap-1'>
                        <Link to='#' className='duration-300 font-medium hover:text-[#4A6CF7]'>Terms & Conditions</Link>
                        <Link to='#' className='duration-300 font-medium hover:text-[#4A6CF7]'>Privacy Policy</Link>
                        <Link to='#' className='duration-300 font-medium hover:text-[#4A6CF7]'>Licensing</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}