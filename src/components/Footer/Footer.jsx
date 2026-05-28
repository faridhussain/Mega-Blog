import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <div className='px-15 py-7 border-t-2 border-t-orange-500 flex justify-between'>
            <div className='flex justify-between flex-col items-center'>
                <h1>Logo</h1>
                <p className='text-sm text-gray-500'>© Copyright 2023. All Rights Reserved by DevUl.</p>
            </div>
            <div className='flex gap-20'>
                <div className='flex flex-col items-center gap-6'>
                    <h3 className='text-lg font-semibold text-gray-600'>Company</h3>
                    <div className='flex flex-col items-center gap-2'>
                        <Link className='duration-300 hover:text-[#D45E00]'>Features</Link>
                        <Link className='duration-300 hover:text-[#D45E00]'>Pricing</Link>
                        <Link className='duration-300 hover:text-[#D45E00]'>Affiliate Program</Link>
                        <Link className='duration-300 hover:text-[#D45E00]'>Press Kit</Link>
                    </div>
                </div>
                <div className='flex flex-col items-center gap-5'>
                    <h3 className='text-lg font-semibold text-gray-600'>Support</h3>
                    <div className='flex flex-col items-center gap-2'>
                        <Link className='duration-300 hover:text-[#D45E00]'>Account</Link>
                        <Link className='duration-300 hover:text-[#D45E00]'>Help</Link>
                        <Link className='duration-300 hover:text-[#D45E00]'>Contact</Link>
                        <Link className='duration-300 hover:text-[#D45E00]'>Customer Support</Link>
                    </div>
                </div>
                <div className='flex flex-col items-center gap-5'>
                    <h3 className='text-lg font-semibold text-gray-600'>Legals</h3>
                    <div className='flex flex-col items-center gap-2'>
                        <Link className='duration-300 hover:text-[#D45E00]'>Terms & Conditions</Link>
                        <Link className='duration-300 hover:text-[#D45E00]'>Privacy Policy</Link>
                        <Link className='duration-300 hover:text-[#D45E00]'>Licensing</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}