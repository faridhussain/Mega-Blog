import appwriteService from '../appwrite/config.js'
import { Link } from 'react-router-dom'

export default function PostCard({ $id, featuredImage, title }) {
    return (
        <Link to={`/post/${$id}`}>
            <div>
                <div>
                    <img src={appwriteService.getFilePreview(featuredImage)} alt={title} />
                </div>
                <h2>{title}</h2>
            </div>
        </Link>
    )
}