import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function AuthLayout({ children, authentication = true }) {
    // used to redirect users when they try to access restricted pages
    const navigate = useNavigate()
    // prevents page content from rendering until authentication check is completed
    const [loader, setLoader] = useState(true)
    // get current authentication status from redux store
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        // redirect unauthenticated users to login page
        // when they try to access protected routes
        if (authentication && authStatus !== authentication) {
            navigate('/login')
        } 
        // redirect authenticated users away from
        // login and signup pages
        else if (!authentication && authStatus !== authentication) {
            navigate('/')
        }
        // authentication check completed
        setLoader(false)
    }, [navigate, authStatus, authentication])

    return (
        loader ? <h1>Loading...</h1> : <div>{children}</div>
    )
}