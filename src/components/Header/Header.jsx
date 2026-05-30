import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Container from '../Container/Container'
import LogoutBtn from './LogoutBtn'

export default function Header() {
    const authStatus = useSelector((state) => state.auth.status)

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
        <header className='py-4 px-8 border-b-2 border-b-[#E5E3DC]'>
            <Container>
                <nav className='flex justify-between items-center'>
                    <div>
                        <Link to='/' className='text-3xl font-semibold'>Mega Blog</Link>
                    </div>
                    <ul className='flex gap-7 items-center'>
                        {navItems.map(item => (
                            item.active ? (
                                <li key={item.name}>
                                    <Link className='text-[#61615e] hover:text-black duration-300 text-lg font-medium' to={item.slug}>{item.name}</Link>
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