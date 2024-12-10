import { NavLink } from 'react-router'
import { FaRegNoteSticky } from "react-icons/fa6";

const navLinks = [
    { label: 'Notes', href: '/', icon: ''},
    { label: 'Archive', href: '/archive', icon: ''}
]

const Navbar = () => {
  return (
    <header className='bg-slate-100 px-8'>
        <nav className='flex justify-between py-4'>
            <NavLink to={'/'} className={'flex inline text-xl items-center gap-2'}>
                <FaRegNoteSticky />
                BetterThanNotion
            </NavLink>
            <ul className='flex gap-4'>
                {navLinks.map(navItem => (
                    <li key={navItem.label}>
                        <NavLink to={navItem.href} className={ ( {isActive} )=> isActive ? 'underline underline-offset-8' : 'hover:underline hover:underline-offset-8 hover:decoration-gray-400 hover:text-gray-400' }>{navItem.label}</NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    </header>
  )
}

export default Navbar
