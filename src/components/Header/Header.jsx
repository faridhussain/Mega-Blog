import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
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
            name: 'My Posts',
            slug: '/my-posts',
            active: authStatus
        },
        {
            name: 'Add Posts',
            slug: '/add-post',
            active: authStatus
        }
    ]

    return (
        <header className='md:py-4 md:px-8 py-2 px-3 sticky top-0 left-0 z-100 bg-[#0A0A08] border-b-2 border-b-[#151513]'>
            <Container>
                <nav className='flex justify-between gap-5 items-center'>
                    <div>
                        <NavLink to='/' className='md:text-3xl text-xl font-black text-white'>Mega <span className='text-[#E05C2A]'>Blog</span></NavLink>
                    </div>
                    <ul className='flex md:gap-7 gap-3 items-center'>
                        {navItems.map(item => (
                            item.active ? (
                                <li key={item.name}>
                                    <NavLink to={item.slug} className={({ isActive }) => `uppercase md:text-lg text-sm duration-300  font-semibold ${ isActive ? 'text-[#E05C2A]' : 'text-[#6B6760] hover:text-[#E7E4DE]'}`}>{item.name}</NavLink>
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