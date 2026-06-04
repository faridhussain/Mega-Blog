import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { Button } from '../index.js'
import { useState } from 'react'
import { successToast } from '../../utils/toast.js'
import { useNavigate } from 'react-router-dom'

export default function LogoutBtn() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const logoutHandler = async () => {
        setLoading(true)

        await authService.logout()
        dispatch(logout())

        navigate('/')
        
        successToast('Logged out successfully')
    }

    return (
        <Button
            onClick={logoutHandler}
            disabled={loading}
            className='uppercase'
        >
            {loading ? 'Logging out...' : 'Logout'}
        </Button>
    )
}