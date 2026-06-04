// application header shown on every page
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Container from '../Container/Container'
import LogoutBtn from './LogoutBtn'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
    // get authentication status from redux store
    const authStatus = useSelector((state) => state.auth.status)

    // controls mobile navigation menu visibility
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    // navigation links shown based on authentication status
    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: 'About',
            slug: '/about',
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

    // main header layout
    return (
        <header className='relative md:py-4 md:px-8 py-2 px-3 top-0 left-0 z-100 bg-[#0A0A08] border-b-2 border-b-[#151513]'>
            <Container>
                <nav className='flex justify-between items-center'>
                    {/* application logo */}
                    <NavLink to='/' className='md:text-3xl text-xl font-black text-white'>
                        Mega <span className='text-[#E05C2A]'>Blog</span>
                    </NavLink>

                    {/* navigation links for desktop screens */}
                    <ul className='hidden md:flex md:gap-6 gap-3 items-center'>
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <NavLink to={item.slug} className={({ isActive }) => `uppercase md:text-base text-sm duration-300 font-bold ${ isActive ? 'text-[#E05C2A]' : 'text-[#6B6760] hover:text-[#E7E4DE]'}`}>{item.name}</NavLink>
                                </li>
                            ) : null
                        )}

                        {/* show logout button only for logged in users */}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>

                    {/* toggle mobile navigation menu */}
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='md:hidden text-white'>{isMenuOpen ? <X size={20} /> : <Menu size={20} />}</button>
                </nav>

                {/* navigation menu for mobile screens */}
                <div className={`md:hidden absolute top-full right-3 w-50 bg-[#0A0A08] border border-[#151513] rounded-lg mt-2 shadow-lg transition-all duration-300 ease-out ${ isMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-3 invisible'}`}>
                    <ul className='flex flex-col py-1'>
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <NavLink to={item.slug} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `block px-5 py-3 font-semibold transition-colors duration-200 ${ isActive ? 'text-[#E05C2A]' : 'text-[#E7E4DE] hover:text-[#E05C2A]'}`}>{item.name}</NavLink>
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