import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import { useState } from 'react'

// reusable rich text editor component used for writing blog content
export default function RTE({ name, control, label, defaultValue = '', rules }) {
    // controls loading state while tinymce editor initializes
    const [editorLoading, setEditorLoading] = useState(true)

    return (
        <div>
            {/* display field label if provided */}
            {label && (
                <label className='font-medium text-[#595650] md:text-base sm:text-sm text-sm pl-1 uppercase'>{label}</label>
            )}
            {/* show loading state until editor is fully ready */}
            {editorLoading && (
                <div className='flex justify-center items-center h-125 border border-[#383733] rounded-md'>
                    <h2 className='text-gray-400 text-xl font-semibold'>Preparing editor...</h2>
                </div>
            )}
            <div className={editorLoading ? 'hidden' : 'block'}>
                {/* connect tinymce editor with react hook form */}
                <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field: { onChange } }) => (
                        // tinymce editor used for creating rich blog content
                        <Editor
                            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                            initialValue={defaultValue}
                            // hide loading state when editor is ready
                            onInit={() => setEditorLoading(false)}
                            // editor configuration and customization
                            init={{
                                branding: false,
                                height: 500,
                                menubar: true,
                                skin: 'oxide-dark',
                                content_css: 'dark',
                                // enable editor features such as images, tables and formatting tools
                                plugins: [
                                    'image', 'advlist', 'autolink', 'lists', 'link', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
                                ],
                                // tools available in the editor toolbar
                                toolbar:
                                    'undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                                    // custom styling applied inside the editor content area
                                content_style: `
                                    body {
                                        background-color: #0A0A08;
                                        color: #d1d5db;
                                        font-family: Helvetica, Arial, sans-serif;
                                        font-size: 14px;
                                    }
                                `
                            }}
                            // update react hook form whenever editor content changes
                            onEditorChange={onChange}
                        />
                    )}
                />
            </div>
        </div>
    )
}