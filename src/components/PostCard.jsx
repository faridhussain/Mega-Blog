import appwriteService from '../appwrite/config.js'
import { Link } from 'react-router-dom'

export default function PostCard({ $id, featuredImage, title, content }) {
    const preview = content?.replace(/<[^>]*>/g, '') || ''
    
    return (
        <Link to={`/post/${$id}`} className='inline-block max-w-sm '>
            <div className='overflow-hidden rounded-md border border-[#383733] transition-all duration-300 cursor-pointer hover:border-white/20 hover:shadow-[0_0_25px_rgba(255,255,255,0.08)]'>
                <div className="max-h-80 flex justify-center bg-black">
                    <img
                        src={appwriteService.getFilePreview(featuredImage)}
                        alt={title}
                        className="max-h-80 w-auto object-contain"
                    />
                </div>
                <div className='p-3 flex flex-col gap-1'>
                    <h2 className='text-lg font-semibold text-[#E05C2A] capitalize'>{title}</h2>
                    <p className='text-sm text-gray-400 line-clamp-3'>{preview}</p>
                </div>
            </div>
        </Link>
    )
}