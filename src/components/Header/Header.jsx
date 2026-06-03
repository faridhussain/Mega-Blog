// Header component shown at the top of every page
// Displays navigation links based on whether the user is logged in or not
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Container from '../Container/Container'
import LogoutBtn from './LogoutBtn'

export default function Header() {
    // Get authentication status from Redux store
    // Used to show different navigation items for guests and logged-in users
    const authStatus = useSelector((state) => state.auth.status)

    // Navigation links configuration
    // active determines whether a link should be visible
    // Guests see Login and Signup
    // Logged-in users see My Posts and Add Posts
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

    // Header layout
    // Shows application logo on the left
    // Shows navigation links and logout button on the right
    return (
        <header className='md:py-4 md:px-8 py-2 px-3 sticky top-0 left-0 z-100 bg-[#0A0A08] border-b-2 border-b-[#151513]'>
            <Container>
                <nav className='flex justify-between gap-5 items-center'>
                    <div>
                        <NavLink to='/' className='md:text-3xl text-xl font-black text-white'>Mega <span className='text-[#E05C2A]'>Blog</span></NavLink>
                    </div>
                    {/* Loop through navigation items and render only active links */}
                    <ul className='flex md:gap-6 gap-3 items-center'>
                        {navItems.map(item => (
                            item.active ? (
                                <li key={item.name}>
                                    <NavLink to={item.slug} className={({ isActive }) => `uppercase md:text-base text-sm duration-300 font-bold ${ isActive ? 'text-[#E05C2A]' : 'text-[#6B6760] hover:text-[#E7E4DE]'}`}>{item.name}</NavLink>
                                </li>
                            ) : null
                        ))}
                        {/* Logout button is only visible when user is logged in */}
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