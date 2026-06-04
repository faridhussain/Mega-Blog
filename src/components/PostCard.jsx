import appwriteService from '../appwrite/config.js'
import { Link } from 'react-router-dom'

export default function PostCard({ $id, featuredImage, title, content, status, showStatus = false }) {
    // remove html tags and create a short text preview
    const preview = content?.replace(/<[^>]*>/g, '') || ''
    return (
        <Link to={`/post/${$id}`} className='block w-full mb-4 break-inside-avoid'>
            <div className='relative overflow-hidden rounded-md border border-[#383733] transition-all duration-300 cursor-pointer hover:border-white/20 hover:shadow-[0_0_25px_rgba(255,255,255,0.08)]'>
                {/* optionally show post status badge */}
                {showStatus && (
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-semibold text-white shadow-md z-10 ${ status === 'active' ? 'bg-green-600' : 'bg-[#E05C2A]'}`}>{status.toUpperCase()}</div>
                )}
                {/* featured image */}
                <div className="max-h-80 flex justify-center bg-black">
                    <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className="max-h-80 w-auto object-contain"/>
                </div>
                {/* post title and preview text */}
                <div className='p-3 flex flex-col gap-1'>
                    <h2 className='text-lg font-semibold text-[#E05C2A] capitalize'>{title}</h2>
                    <p className='text-sm text-gray-400 line-clamp-3'>{preview}</p>
                </div>
            </div>
        </Link>
    )
}