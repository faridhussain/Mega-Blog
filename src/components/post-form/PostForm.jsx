import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button, Input, RTE, Select } from '../index.js'
import appwriteService from '../../appwrite/config.js'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

export default function PostForm({ post = null }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || ''
        }
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const submit = async (data) => {
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
                        className='px-4 py-2 border border-[#4A6CF7] text-[#4A6CF7] w-50 rounded-md font-medium cursor-pointer hover:opacity-90 duration-300 text-center'
                    >
                        Upload Image
                    </label>

                    <input
                        id='image-upload'
                        type='file'
                        accept='image/png, image/jpg, image/gif'
                        className='hidden'
                        {...register('image', { required: !post })}
                    />
                </div>
                {post && (
                    <div>
                        <img 
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className=''
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
                <Button 
                    type='submit'
                    bgColor={post ? 'bg-green-600' : undefined}
                    className='w-50'
                > 
                    {post ? 'Update' : 'Submit'}
                </Button>
            </div>
        </form>
    )
}