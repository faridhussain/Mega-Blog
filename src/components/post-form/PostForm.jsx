import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Input, RTE, Select } from '../index.js'
import appwriteService from '../../appwrite/config.js'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ImageIcon, ChevronDown, ChevronUp, Check } from 'lucide-react'
import { successToast } from '../../utils/toast.js'

// manages both creating new posts and updating existing posts
export default function PostForm({ post = null }) {
    // initialize form fields with existing post data when editing
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

    // used to redirect user after creating or updating a post
    const navigate = useNavigate()
    // get current logged in user from redux store
    const userData = useSelector((state) => state.auth.userData)
    // prevents multiple form submissions
    const [isSubmitting, setIsSubmitting] = useState(false)

    // stores image preview for uploaded or existing featured image
    const [imagePreview, setImagePreview] = useState(post ? appwriteService.getFilePreview(post.featuredImage) : null)

    // handles post creation and post updates
    const submit = async (data) => {
        // start loading state while form is being submitted
        setIsSubmitting(true)
        try {
            // update existing post
            if (post) {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null
                // upload new image only if user selected one
                if (file) {
                    await appwriteService.deleteFile(post.featuredImage)
                }
                // update post data in appwrite database
                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined
                })
                // notify user that update was successful
                if (dbPost) {
                    successToast('Post updated successfully')
                    navigate(`/post/${dbPost.$id}`)
                }
            // create a new post
            } else {
                // upload featured image before creating post
                const file = await appwriteService.uploadFile(data.image[0])
                if (file) {
                    data.featuredImage = file.$id
                    // create post in appwrite database
                    const dbPost = await appwriteService.createPost({
                        ...data,
                        userId: userData.$id
                    })
                    if (dbPost) {
                        // notify user that post was published
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
    
    // automatically generate a url friendly slug from title
    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value.trim().toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-')
        }
        return ''
    }, [])

    // update slug whenever title changes
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

    // register custom select field with react hook form
    useEffect(() => {
        register('status', {
            required: 'Status is required'
        })
    }, [register])

    return (
        <form autoComplete='off' className='flex flex-col lg:flex-row lg:items-center gap-5 py-4 px-3 md:px-6' onSubmit={handleSubmit(submit)}>
            <div className='flex flex-col gap-2 w-full lg:w-3/4'>
                {/* title input field */}
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
                    <p className='text-red-500 text-sm'>{errors.title.message}</p>
                )}
                {/* slug input field */}
                <Input
                    label = 'Slug: '
                    placeholder = 'Slug'
                    className = 'mb-3'
                    { ...register('slug')}
                    onInput={(e) => {
                        setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true })
                    }}
                />
                {/* rich text editor for post content */}
                <RTE 
                    label='Content: ' 
                    name='content' 
                    control={control} 
                    defaultValue={getValues('content')} 
                    rules={{
                        required: 'Content is required',
                        validate: (value) => value.replace(/<[^>]*>/g, '').trim().length >= 10 || 'Content must be at least 10 characters'
                    }}
                />
                {errors.content && (
                    <p className='text-red-500 text-sm'>{errors.content.message}</p>
                )}
            </div>
            <div className='w-full lg:w-1/4 border border-[#383733] flex flex-col gap-5 rounded-md p-4 md:p-6 bg-[#0E0D09]'>
            {/* featured image upload and preview */}
                <label className='font-medium text-[#595650] uppercase'>Featured Image</label>
                {!imagePreview && (
                    <label htmlFor='image-upload' className='h-40 md:h-52 border-2 border-dashed border-[#4a4a4a] rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-[#E05C2A] duration-300'>
                        <ImageIcon size={32} className='text-gray-400 mb-3 md:w-10 md:h-10' />
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
                    <img src={imagePreview} alt='Preview' className='w-full max-h-72 object-contain rounded-md border border-[#383733]' />
                )}
                <div className='border-t border-[#383733]' />
                <div className='flex flex-col gap-2'>
                    {/* post status selector */}
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
                        <p className='text-red-500 text-sm'>{errors.status.message}</p>
                    )}
                </div>
                <div className='flex flex-col sm:flex-row gap-3'>
                    {post && (
                        // shown only while editing a post
                        <Button
                            type='button'
                            bgColor='bg-gray-500'
                            hoverEffect='hover:shadow-[0_0_20px_rgba(156,163,175,0.5)]'
                            onClick={() => navigate(`/post/${post.$id}`)}
                        >
                            Cancel
                        </Button>
                    )}
                    {/* publish or update button */}
                    <Button
                        type='submit'
                        className='w-full justify-center'
                        bgColor={post ? 'bg-green-600' : 'bg-[#E05C2A]'}
                        hoverEffect={post ? 'hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]' : 'hover:shadow-[0_0_20px_rgba(219,146,88,0.3)]'}
                    >
                        {isSubmitting ? (post ? 'Updating...' : 'Publishing...') : (post ? 'Update Post' : 'Publish Post')}
                    </Button>
                </div>  
            </div>
        </form>
    )
}