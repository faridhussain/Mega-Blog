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
    const { register, handleSubmit } = useForm()

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
            setError(error.message)
        }
    }

    return (
        <div className='w-fit mx-auto rounded-md py-15 px-10 shadow-2xl flex justify-center items-center flex-col gap-2'>
            <h2 className='text-3xl font-bold'>Sign up to create account</h2>
            <p  className='text-[#555555] text-lg mb-5'>
                Already have an account?&nbsp;
                <Link className='text-[#4A6CF7] font-bold hover:underline' to='/login'>Sign In</Link>
            </p>
            {error && <p className='text-red-600'>{error}</p>}
            <form autoComplete='off' onSubmit={handleSubmit(create)}>
                <div className='flex flex-col gap-4'>
                    {/* Input for full name */}
                    <Input 
                        className='w-100'
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
                        className='w-100'
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
                        className='w-100'
                        placeholder='Enter your password'
                        { ...register('password', {
                            required: true
                        }) }
                    />
                    <Button type='submit' className='w-full'>Create Account</Button>
                </div> 
            </form>
        </div>
    )
}