import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { useState } from 'react'
import { Button, Input } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

export default function Signup() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm()

    const create = async (data) => {
        setError('')
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(login({userData}))
                }
                navigate('/')
            }
        } catch (error) {
            if (error.message.includes('already exists')) {
                setError('An account with this email already exists')
            } else {
                setError('Something went wrong. Please try again.')
            }
        }
    }

    return (
        <div className='min-h-[70vh] flex justify-center items-center flex-col gap-2'>
            <div className='w-fit mx-auto rounded-md py-15 px-10 shadow-2xl'>
                <h2 className='text-3xl font-bold'>Sign up to create account</h2>
                <p  className='text-[#555555] text-lg mb-5'>
                    Already have an account?&nbsp;
                    <Link className='text-[#4A6CF7] font-bold hover:underline' to='/login'>Sign In</Link>
                </p>
                <form autoComplete='off' onSubmit={handleSubmit(create)}>
                    <div className='flex flex-col gap-4'>

                        {/* Input for full name */}
                        <Input 
                            className='w-100'
                            label='Full name:'
                            autoComplete='off'
                            placeholder='Enter your full name'
                            { ...register('name', {
                                required: 'Full name is required',
                                minLength: {
                                    value: 5,
                                    message: 'Full name must be at least 5 characters'
                                },
                                validate: (value) =>
                                    value.trim().split(' ').length >= 2 ||
                                    'Please enter your first and last name'
                            }) }
                        />
                        {errors.name && (
                            <p className='text-red-600 text-sm'>
                                {errors.name.message}
                            </p>
                        )}

                        {/* Input for email */}
                        <Input
                            autoComplete='new-email'
                            label='Email: '
                            type='email'
                            className='w-100'
                            placeholder='Enter your email'
                            { ...register('email', {
                                required: 'Email is required',
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Email address must be a valid address'
                                }
                            }) }
                        />
                        {errors.email && (
                            <p className='text-red-600 text-sm'>
                                {errors.email.message}
                            </p>
                        )}

                        {/* input for password */}
                        <Input 
                            label='Password: '
                            type='password'
                            className='w-100'
                            autoComplete='new-password'
                            placeholder='Enter your password'
                            { ...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters'
                                }
                            }) }
                        />
                        {errors.password && (
                            <p className='text-red-600 text-sm'>
                                {errors.password.message}
                            </p>
                        )}

                        {error && (
                            <p className='text-red-600 text-sm'>
                                {error}
                            </p>
                        )}

                        <Button type='submit' className='w-full'>Create Account</Button>
                    </div> 
                </form>
            </div>
        </div>
    )
}