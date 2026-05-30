import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Input, RTE, Select } from '../index.js'
import appwriteService from '../../appwrite/config.js'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

export default function PostForm({ post = null }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || ''
        }
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const [imagePreview, setImagePreview] = useState(
        post ? appwriteService.getFilePreview(post.featuredImage) : null
    )

    const submit = async (data) => {
        console.log(data)

        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null

            if (file) {
                appwriteService.deleteFile(post.featuredImage)
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            })

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0])

            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId

                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id
                })

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
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

    return (
        <form autoComplete='off' className='flex gap-5 items-center py-5 px-10' onSubmit={handleSubmit(submit)}>
            <div className='flex flex-col gap-3 w-3/4'>
                <Input
                    label = 'Title: '
                    placeholder = 'Title'
                    className = ''
                    { ...register('title', {
                        required: true
                    })}
                />
                <Input
                    label = 'Slug: '
                    placeholder = 'Slug'
                    className = ''
                    { ...register('slug', {
                        required: true
                    })}
                    onInput={(e) => {
                        setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true })
                    }}
                />
                <RTE 
                    label='Content: ' 
                    name='content' 
                    control={control} 
                    defaultValue={getValues('content')} 
                />
            </div>
            <div className='flex flex-col gap-5 w-1/4'>
                <div className='flex flex-col gap-2'>
                    <label className='font-medium text-lg'>
                        Featured Image:
                    </label>

                    <label
                        htmlFor='image-upload'
                        className='px-4 py-2 bg-[#4A6CF7] text-white w-50 rounded-md font-medium cursor-pointer hover:opacity-90 duration-300 text-center'
                    >
                        {post ? 'Update Image' : 'Upload Image'}
                    </label>

                    <input
                        id='image-upload'
                        type='file'
                        accept='image/png, image/jpeg, image/gif'
                        className='hidden'
                        {...register('image', {
                            required: !post,
                            onChange: (e) => {
                                const file = e.target.files[0]

                                if (file) {
                                    setImagePreview(URL.createObjectURL(file))
                                }
                            }
                        })}
                    />
                </div>
                {imagePreview && (
                    <div>
                        <img
                            src={imagePreview}
                            alt='Preview'
                            className='rounded-md'
                        />
                    </div>
                )}
                <Select 
                    options={['active', 'inactive']}
                    label='Status'
                    className=''
                    { ...register('status', {
                        required: true
                    }) }
                />
                <div className='flex gap-3'>
                    {post && (
                        <Button
                            type='button'
                            bgColor='bg-gray-500'
                            onClick={() => navigate(`/post/${post.$id}`)}
                        >
                            Cancel
                        </Button>
                    )}

                    <Button
                        type='submit'
                        bgColor={post ? 'bg-green-600' : undefined}
                    >
                        {post ? 'Update' : 'Submit'}
                    </Button>
                </div>  
            </div>
        </form>
    )
}