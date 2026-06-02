import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

export default function RTE({ name, control, label, defaultValue = '', rules }) {
    return (
        <div>
            {label && <label className='font-medium text-[#595650] md:text-base sm:text-sm text-sm pl-1 uppercase'>{label}</label>}
            <Controller 
                name={name}
                control={control}
                rules={rules}
                render={({field: {onChange}}) => (
                    <Editor 
                        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                        initialValue={defaultValue} 
                        init={{
                            initialValue: defaultValue,
                            branding: false,    
                            height: 500,
                            menubar: true,
                            skin: 'oxide-dark',
                            content_css: 'dark',
                            plugins: [ 'image', 'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'anchor' ],
                            toolbar: 'undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                            content_style: 'body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }',
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
    )
}