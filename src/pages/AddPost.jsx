import { Container, PostForm } from '../components/index.js'

export default function AddPost() {
    return (
        // page used to create a new blog post
        <div>
            <Container>
                {/* reusable form component used for creating posts */}
                <PostForm />
            </Container>
        </div>
    )
}