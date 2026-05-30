import appwriteService from '../appwrite/config.js'
import { Link } from 'react-router-dom'

export default function PostCard({ $id, featuredImage, title }) {
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
                    <h2 className='text-lg font-semibold'>
                        {title}
                    </h2>
                </div>
            </div>
        </Link>
    )
}