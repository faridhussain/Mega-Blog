import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import { useState } from 'react'

export default function RTE({
    name,
    control,
    label,
    defaultValue = '',
    rules
}) {
    const [editorLoading, setEditorLoading] = useState(true)

    return (
        <div>
            {label && (
                <label className='font-medium text-[#595650] md:text-base sm:text-sm text-sm pl-1 uppercase'>
                    {label}
                </label>
            )}

            {editorLoading && (
                <div className='flex justify-center items-center h-125 border border-[#383733] rounded-md'>
                    <h2 className='text-gray-400 text-xl font-semibold'>
                        Preparing editor...
                    </h2>
                </div>
            )}

            <div className={editorLoading ? 'hidden' : 'block'}>
                <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field: { onChange } }) => (
                        <Editor
                            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                            initialValue={defaultValue}
                            onInit={() => setEditorLoading(false)}
                            init={{
                                branding: false,
                                height: 500,
                                menubar: true,
                                skin: 'oxide-dark',
                                content_css: 'dark',
                                plugins: [
                                    'image',
                                    'advlist',
                                    'autolink',
                                    'lists',
                                    'link',
                                    'charmap',
                                    'preview',
                                    'anchor',
                                    'searchreplace',
                                    'visualblocks',
                                    'code',
                                    'fullscreen',
                                    'insertdatetime',
                                    'media',
                                    'table',
                                    'help',
                                    'wordcount'
                                ],
                                toolbar:
                                    'undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                                content_style: `
                                    body {
                                        background-color: #0A0A08;
                                        color: #d1d5db;
                                        font-family: Helvetica, Arial, sans-serif;
                                        font-size: 14px;
                                    }
                                `
                            }}
                            onEditorChange={onChange}
                        />
                    )}
                />
            </div>
        </div>
    )
}