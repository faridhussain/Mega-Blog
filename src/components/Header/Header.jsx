// Header component shown at the top of every page
// Displays navigation links based on whether the user is logged in or not
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Container from '../Container/Container'
import LogoutBtn from './LogoutBtn'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
    // Get authentication status from Redux store
    // Used to show different navigation items for guests and logged-in users
    const authStatus = useSelector((state) => state.auth.status)

    const [isMenuOpen, setIsMenuOpen] = useState(false)

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
    <header className='relative md:py-4 md:px-8 py-2 px-3 top-0 left-0 z-100 bg-[#0A0A08] border-b-2 border-b-[#151513]'>
        <Container>
            <nav className='flex justify-between items-center'>
                {/* logo */}
                <NavLink
                    to='/'
                    className='md:text-3xl text-xl font-black text-white'
                >
                    Mega <span className='text-[#E05C2A]'>Blog</span>
                </NavLink>

                {/* desktop menu */}
                <ul className='hidden md:flex md:gap-6 gap-3 items-center'>
                    {navItems.map((item) =>
                        item.active ? (
                            <li key={item.name}>
                                <NavLink
                                    to={item.slug}
                                    className={({ isActive }) =>
                                        `uppercase md:text-base text-sm duration-300 font-bold ${
                                            isActive
                                                ? 'text-[#E05C2A]'
                                                : 'text-[#6B6760] hover:text-[#E7E4DE]'
                                        }`
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            </li>
                        ) : null
                    )}

                    {authStatus && (
                        <li>
                            <LogoutBtn />
                        </li>
                    )}
                </ul>

                {/* mobile menu button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className='md:hidden text-white'
                >
                    {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </nav>

            {/* mobile dropdown menu */}
            <div
                className={`md:hidden absolute top-full right-3 w-50 bg-[#0A0A08] border border-[#151513] rounded-lg mt-2 shadow-lg transition-all duration-300 ease-out ${
                    isMenuOpen
                        ? 'opacity-100 translate-y-0 visible'
                        : 'opacity-0 -translate-y-3 invisible'
                }`}
            >
                <ul className='flex flex-col py-1'>
                    {navItems.map((item) =>
                        item.active ? (
                            <li key={item.name}>
                                <NavLink
                                    to={item.slug}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `block px-5 py-3 font-semibold transition-colors duration-200 ${
                                            isActive
                                                ? 'text-[#E05C2A]'
                                                : 'text-[#E7E4DE] hover:text-[#E05C2A]'
                                        }`
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            </li>
                        ) : null
                    )}

                    {authStatus && (
                        <li className='border-t border-[#151513] py-2 px-5'>
                            <LogoutBtn />
                        </li>
                    )}
                </ul>
            </div>
        </Container>
    </header>
)
}