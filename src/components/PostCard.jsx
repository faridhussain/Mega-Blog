import appwriteService from '../appwrite/config.js'
import { Link } from 'react-router-dom'

export default function PostCard({ $id, featuredImage, title, content }) {
    const preview = content ?.replace(/<[^>]*>/g, '') ?.slice(0, 80)
    
    return (
        <Link to={`/post/${$id}`}>
            <div className='overflow-hidden rounded-xl shadow-md hover:shadow-xl duration-300 cursor-pointer'>
                <div className='h-52 overflow-hidden'>
                    <img
                        src={appwriteService.getFilePreview(featuredImage)}
                        alt={title}
                        className='w-full h-full object-cover'
                    />
                </div>
                <div className='p-4'>
                    <h2 className='text-lg font-semibold'>{title}</h2>
                    <p className='text-sm text-gray-600'>
                        {preview}...
                    </p>
                </div>
            </div>
        </Link>
    )
}