import authService from '../appwrite/auth.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { login as authLogin } from '../store/authSlice.js'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input } from './index.js'
import { MoveRight } from 'lucide-react';

export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm()
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
            if (error.message.includes('Invalid credentials')) {
                setError('Invalid email or password')
            } else {
                setError('Something went wrong. Please try again.')
            }
        }
    }

    return (    
        <div className='min-h-[75vh] flex justify-center items-center flex-col gap-2 md:p-5 p-3'>
            <div className='w-full max-w-170 mx-auto rounded-md md:p-10 p-4 flex flex-col gap-2 border border-[#383733]'>
                <h2 className='md:text-3xl sm:text-2xl text-xl font-bold text-center text-white'>Sign in to your account</h2>
                <p className='text-[#595650] md:text-lg sm:text-base text-sm mb-12 text-center'>
                    Don&apos;t have an account?&nbsp;
                    <Link className='text-[#DB9258] outline-none font-semibold hover:text-[#be7e4a] duration-300 italic inline-flex items-center gap-1' to='/signup'>Sign Up<MoveRight size={16} /></Link>
                </p>                        
                <form autoComplete='off' onSubmit={handleSubmit(login)}>
                    <div className='flex flex-col gap-5'>
                        <div className='flex flex-col gap-2'>
                            {/* Input for email */}
                            <Input
                                label='Email Address: '
                                type='email'
                                autoComplete='new-email'
                                className='w-full'
                                placeholder='Enter your email'
                                {...register('email', {
                                    required: 'Email is required',
                                    validate: {
                                        matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Please enter a valid email'
                                    }
                                })}
                            />
                            {errors.email && (
                                <p className='text-red-500 text-sm pl-1'>{errors.email.message}</p>
                            )}
                        </div>

                        <div className='flex flex-col gap-2'>
                            {/* Input for password */}
                            <Input 
                                className='w-full'
                                label='Password: '
                                autoComplete='new-password'
                                type='password'
                                placeholder='Enter your password'
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be at least 8 characters'
                                    }
                                })}
                            />
                            {errors.password && (
                                <p className='text-red-500 text-sm pl-1'>{errors.password.message}</p>
                            )}
                        </div>
                            
                        {error && <p className='text-red-500'>{error}</p>}

                        <Button type='submit' className='w-full outline-none mt-3'>Sign In</Button>
                    </div>  
                </form>
            </div>
        </div>
    )
}