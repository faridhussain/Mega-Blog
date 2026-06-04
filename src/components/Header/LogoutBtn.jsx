import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { Button } from '../index.js'
import { useState } from 'react'
import { successToast } from '../../utils/toast.js'
import { useNavigate } from 'react-router-dom'

export default function LogoutBtn() {
    // used to update authentication state in redux
    const dispatch = useDispatch()
    // prevents multiple logout requests
    const [loading, setLoading] = useState(false)
    // used to redirect user after logout
    const navigate = useNavigate()

    const logoutHandler = async () => {
        // show loading state while logout request is in progress
        setLoading(true)
        // remove current user session from appwrite
        await authService.logout()
        // clear user data from redux store
        dispatch(logout())
        // redirect user to home page after logout
        navigate('/')
        // show success message
        successToast('Logged out successfully')
    }
    return (
        <Button onClick={logoutHandler} disabled={loading} className='uppercase'>{loading ? 'Logging out...' : 'Logout'}</Button>
    )
}