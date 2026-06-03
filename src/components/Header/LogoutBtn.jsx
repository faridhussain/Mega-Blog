import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { Button } from '../index.js'
import { useState } from 'react'
import { successToast } from '../../utils/toast.js'

export default function LogoutBtn() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const logoutHandler = async () => {
        setLoading(true)

        await authService.logout()
        dispatch(logout())

        successToast('Logged out successfully')

        setLoading(false)
    }

    return (
        <Button
            onClick={logoutHandler}
            disabled={loading}
            className='uppercase text-base!'
        >
            {loading ? 'Logging out...' : 'Logout'}
        </Button>
    )
}