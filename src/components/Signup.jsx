import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { useState } from 'react'
import { Button, Input, Logo } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

export default function Signup() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError('')
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(login(userData))
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
                        <Logo></Logo>
                    </span>
                </div>
                <h2>Sign up to create account</h2>
                <p>
                    Already have an account?&nsbp;
                    <Link to='/login'>Sign In</Link>
                </p>
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit(create)}>
                    <div>
                        {/* Input for full name */}
                        <Input 
                            label='Full name:'
                            placeholder='Enter your full name'
                            { ...register('name', {
                                required: true
                            }) }
                        />
                        {/* Input for email */}
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
                        {/* input for password */}
                        <Input 
                            label='Password: '
                            type='password'
                            placeholder='Enter your password'
                            { ...register('password', {
                                required: true
                            }) }
                        />
                        <Button type='submit'>Create Account</Button>
                    </div> 
                </form>
            </div>
        </div>
    )
}