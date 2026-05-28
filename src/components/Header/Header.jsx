import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Container from '../Container/Container'
import LogoutBtn from './LogoutBtn'

export default function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus
        },
        {
            name: 'Signup',
            slug: '/signup',
            active: !authStatus
        },
        {
            name: 'All Posts',
            slug: '/all-posts',
            active: authStatus
        },
        {
            name: 'Add Posts',
            slug: '/add-post',
            active: authStatus
        }
    ]

    return (
        <header>
            <Container>
                <nav>
                    <div>
                        <Link to='/' className='text-3xl font-black'>Logo</Link>
                    </div>
                    <ul>
                        {navItems.map(item => (
                            item.active ? (
                                <li key={item.name}>
                                    <button onClick={() => navigate(item.slug)}>{item.name}</button>
                                </li>
                            ) : null
                        ))}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}