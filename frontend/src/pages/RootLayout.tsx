import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const RootLayout = () => {
    return (
        <div>
            <Navbar />
			<main className='px-8 pt-4 pb-8'>
	            <Outlet />
            </main>
        </div>
    )
}

export default RootLayout