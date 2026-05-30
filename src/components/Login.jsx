import authService from '../appwrite/auth.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { login as authLogin } from '../store/authSlice.js'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input } from './index.js'

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
                    dispatch(authLogin({userData}))
                }
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='w-fit mx-auto rounded-md py-15 px-10 shadow-2xl flex justify-center items-center flex-col gap-2'>
            <h2 className='text-3xl font-bold'>Sign in to your account</h2>
            <p className='text-[#555555] text-lg mb-5'>
                Don&apos;t have an account?&nbsp;
                <Link className='text-[#4A6CF7] font-bold hover:underline' to='/signup'>Sign Up</Link>
            </p>
            {error && <p className='text-red-600'>{error}</p>}
            <form autoComplete='off' onSubmit={handleSubmit(login)}>
                <div className='flex flex-col gap-4'>
                    <Input
                        label='Email: '
                        type='email'
                        className='w-100'
                        placeholder='Enter your email'
                        { ...register('email', {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Email address must be a valid address'
                            }
                        }) }
                    />
                    <Input 
                        className='w-100'
                        label='Password: '
                        type='password'
                        placeholder='Enter your password'
                        { ...register('password', {
                            required: true
                        }) }
                    />
                    <Button type='submit' className='w-full'>Sign In</Button>
                </div>  
            </form>
        </div>
    )
}