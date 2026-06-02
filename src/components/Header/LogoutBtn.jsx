import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { Button } from '../index.js'

export default function LogoutBtn() {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        authService.logout()
        .then(() => {
            dispatch(logout())
        })
    }

    return (
        <Button onClick={logoutHandler} className='uppercase'>Logout</Button>
    )
}