import authService from '../appwrite/auth.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { login as authLogin } from '../store/authSlice.js'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Logo } from './index.js'

export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')

    const login = async (data) => {
        setError('')
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(authLogin(userData))
                }
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div>
            <div>
                <div>
                    <span>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2>Sign in to your account</h2>
                <p>
                    Don&apos;t have an account?&nbsp;
                    <Link to='/signup'>Sign Up</Link>
                </p>
                {error && <p className='text-red-600'>{error}</p>}
                <form onSubmit={handleSubmit(login)}>
                    <div>
                        <Input
                            label='Email: '
                            type='email'
                            placeholder='Enter your email'
                            { ...register('email', {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Email address must be a valid address'
                                }
                            }) }
                        />
                        <Input 
                            label='Password: '
                            type='password'
                            placeholder='Enter your password'
                            { ...register('password', {
                                required: true
                            }) }
                        />
                        <Button>Sign In</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}