    import authService from '../appwrite/auth'
    import { Link, useNavigate } from 'react-router-dom'
    import { login } from '../store/authSlice'
    import { useState } from 'react'
    import { Button, Input } from './index.js'
    import { useDispatch } from 'react-redux'
    import { useForm } from 'react-hook-form'
    import { MoveRight, Eye, EyeOff } from 'lucide-react';

    export default function Signup() {
        const dispatch = useDispatch()
        const navigate = useNavigate()
        const [showPassword, setShowPassword] = useState(false)
        const [loading, setLoading] = useState(false)
        const [error, setError] = useState('')
        const { register, handleSubmit, formState: { errors } } = useForm()

        const create = async (data) => {
            setError('')
            setLoading(true)
            try {
                const account = await authService.createAccount(data)
                if (account) {
                    const userData = await authService.getCurrentUser()
                    if (userData) {
                        dispatch(login({userData}))
                        navigate('/')
                    }
                }
            } catch (error) {
                if (error?.message?.includes('already exists')) {
                    setError('An account with this email already exists')
                } else {
                    setError('Something went wrong. Please try again.')
                }
            } finally {
                setLoading(false)
            }
        }

        return (
            <div className='min-h-[75vh] flex justify-center items-center flex-col gap-2 md:p-5 p-3'>  
                <div className='w-full max-w-170 mx-auto rounded-md md:p-10 p-4 border border-[#383733] flex flex-col gap-2'>
                    <h2 className='md:text-3xl sm:text-2xl text-xl font-bold text-center text-white'>Sign up to create account</h2>
                    <p className='text-[#595650] md:text-lg sm:text-base text-sm mb-12 text-center'>
                        Already have an account?&nbsp;
                        <Link className='group text-[#DB9258] outline-none font-semibold duration-300 italic inline-flex items-center gap-1' to='/login'>Sign In<MoveRight className='transition-transform duration-300 group-hover:translate-x-0.5' size={16} /></Link>
                    </p>
                    <form autoComplete='off' onSubmit={handleSubmit(create)}>
                        <div className='flex flex-col gap-5'>

                            <div className='flex flex-col gap-2'>
                                {/* Input for full name */}
                                <Input 
                                    className='w-full'
                                    label='Full name:'
                                    autoComplete='off'
                                    placeholder='Enter your full name'
                                    { ...register('name', {
                                        required: 'Full name is required',
                                        minLength: {
                                            value: 5,
                                            message: 'Full name must be at least 5 characters'
                                        },
                                        validate: (value) => /^[A-Za-z]{2,}(?:\s+[A-Za-z]{2,})+$/.test(value) || 'Please enter your first and last name'
                                    }) }
                                />
                                {errors.name && (
                                    <p className='text-red-500 text-sm pl-1'>
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div className='flex flex-col gap-2'>
                                {/* Input for email */}
                                <Input
                                    autoComplete='email'
                                    label='Email Address: '
                                    type='email'
                                    className='w-full'
                                    placeholder='Enter your email'
                                    { ...register('email', {
                                        required: 'Email is required',
                                        validate: {
                                            matchPattern: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Email address must be a valid address'
                                        }
                                    }) }
                                />
                                {errors.email && (
                                    <p className='text-red-500 text-sm pl-1'>
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div className='flex flex-col gap-2'>
                                <div className='relative'>
                                    {/* Input for password */}
                                    <Input
                                        label='Password: '
                                        className='w-full'
                                        autoComplete='new-password'
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder='Enter your password'
                                        {...register('password', {
                                            required: 'Password is required',
                                            validate: {
                                                matchPattern: (value) =>  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(value) || 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
                                            },
                                            minLength: {
                                                value: 8,
                                                message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
                                            }
                                        })}
                                    />

                                    <button
                                        type='button'
                                        onClick={() => setShowPassword(prev => !prev)}
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        className='absolute right-3 top-[70%] -translate-y-1/2 text-[#777]'
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>

                                {errors.password && (
                                    <p className='text-red-500 text-sm pl-1'>
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {error && (
                                <p className='text-red-500 text-sm text-center'>
                                    {error}
                                </p>
                            )}

                            <Button
                                disabled={loading}
                                type='submit'
                                className='w-full outline-none mt-3'
                            >
                                {loading ? 'Creating account...' : 'Create Account'}
                            </Button>
                        </div> 
                    </form>
                </div>
            </div>
        )
    }