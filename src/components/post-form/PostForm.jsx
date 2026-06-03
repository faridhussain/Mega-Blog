import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Input, RTE, Select } from '../index.js'
import appwriteService from '../../appwrite/config.js'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ImageIcon, ChevronDown, ChevronUp, Check } from 'lucide-react'
import { successToast } from '../../utils/toast.js'

export default function PostForm({ post = null }) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        getValues,
        formState: { errors }
    } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || ''
        }
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [imagePreview, setImagePreview] = useState(
        post ? appwriteService.getFilePreview(post.featuredImage) : null
    )

    const submit = async (data) => {
        setIsSubmitting(true)

        try {
            if (post) {
                const file = data.image[0]
                    ? await appwriteService.uploadFile(data.image[0])
                    : null

                if (file) {
                    await appwriteService.deleteFile(post.featuredImage)
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined
                })

                if (dbPost) {
                    successToast('Post updated successfully')
                    navigate(`/post/${dbPost.$id}`)
                }
            } else {
                const file = await appwriteService.uploadFile(data.image[0])

                if (file) {
                    data.featuredImage = file.$id

                    const dbPost = await appwriteService.createPost({
                        ...data,
                        userId: userData.$id
                    })

                    if (dbPost) {
                        successToast('Post published successfully')
                        navigate(`/post/${dbPost.$id}`)
                    }
                }
            }
        } catch (error) {
            console.log('Post submit error:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value.trim().toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-')
        }
        return ''
    }, [])

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), {shouldValidate: true})
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])

    useEffect(() => {
        register('status', {
            required: 'Status is required'
        })
    }, [register])

    return (
        <form autoComplete='off' className='flex gap-5 items-center justify-center py-4 px-6' onSubmit={handleSubmit(submit)}>
            <div className='flex flex-col gap-2 w-3/4'>
                <Input
                    label = 'Title: '
                    placeholder = 'Title'
                    className = ''
                    {...register('title', {
                        required: 'Title is required',
                        minLength: {
                            value: 3,
                            message: 'Title must be at least 3 characters'
                        }
                    })}
                />
                {errors.title && (
                    <p className='text-red-500 text-sm mb-2'>
                        {errors.title.message}
                    </p>
                )}
                <Input
                    label = 'Slug: '
                    placeholder = 'Slug'
                    className = 'mb-3'
                    { ...register('slug')}
                    onInput={(e) => {
                        setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true })
                    }}
                />
                <RTE 
                    label='Content: ' 
                    name='content' 
                    control={control} 
                    defaultValue={getValues('content')} 
                    rules={{
                        required: 'Content is required',
                        validate: (value) =>
                            value.replace(/<[^>]*>/g, '').trim().length >= 10 ||
                            'Content must be at least 10 characters'
                    }}
                />
                {errors.content && (
                    <p className='text-red-500 text-md'>
                        {errors.content.message}
                    </p>
                )}
            </div>
            <div className='w-1/4 border border-[#383733] flex flex-col gap-5 rounded-md p-6 bg-[#0E0D09]'>
                <label className='font-medium text-[#595650] uppercase'>Featured Image</label>
                {!imagePreview && (
                    <label
                        htmlFor='image-upload'
                        className='h-52 border-2 border-dashed border-[#4a4a4a] rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-[#E05C2A] duration-300'
                    >
                        <ImageIcon size={40} className='text-gray-400 mb-3' />
                        <span className='text-gray-300 font-medium'>Click to upload</span>
                        <span className='text-sm text-gray-500'>PNG, JPG, GIF</span>
                    </label>
                )}
                <input
                    id='image-upload'
                    type='file'
                    accept='image/png, image/jpeg, image/gif'
                    className='hidden'  
                    {...register('image', {
                        required: !post ? 'Featured image is required' : false,
                        onChange: (e) => {
                            const file = e.target.files?.[0]

                            if (file) {
                                setImagePreview(URL.createObjectURL(file))
                            }
                        }
                    })}
                />
                {errors.image && (
                    <p className='text-red-500 text-sm'>
                        {errors.image.message}
                    </p>
                )}
                {imagePreview && (
                    <img
                        src={imagePreview}
                        alt='Preview'
                        className='max-h-72 w-auto object-contain mt-4 rounded-md border border-[#383733]'
                    />
                )}
                <div className='border-t border-[#383733]' />
                <div className='flex flex-col gap-2'>
                    <Select
                        label='Status:'
                        options={['active', 'inactive']}
                        value={watch('status')}
                        onChange={(value) =>
                            setValue('status', value, {
                                shouldValidate: true
                            })
                        }
                    />
                    {errors.status && (
                        <p className='text-red-500 text-sm'>
                            {errors.status.message}
                        </p>
                    )}
                </div>
                <div className='flex gap-3'>
                    {post && (
                        <Button
                            type='button'
                            bgColor='bg-gray-500'
                            hoverEffect='hover:shadow-[0_0_20px_rgba(156,163,175,0.5)]'
                            onClick={() => navigate(`/post/${post.$id}`)}
                        >
                            Cancel
                        </Button>
                    )}

                    <Button
                        type='submit'
                        className='w-full justify-center'
                        bgColor={post ? 'bg-green-600' : 'bg-[#E05C2A]'}
                        hoverEffect={
                            post
                                ? 'hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]'
                                : 'hover:shadow-[0_0_20px_rgba(219,146,88,0.3)]'
                        }
                    >
                        {isSubmitting
                            ? (post ? 'Updating...' : 'Publishing...')
                            : (post ? 'Update Post' : 'Publish Post')
                        }
                    </Button>
                </div>  
            </div>
        </form>
    )
}