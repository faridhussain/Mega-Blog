import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

export default function RTE({ name, control, label, defaultValue = '' }) {
    return (
        <div>
            {label && <label>{label}</label>}
            <Controller 
                name={name}
                control={control}
                render={({field: {onchange}}) => (
                    <Editor 
                        initialValue='default value'
                        init={{
                            initialValue: defaultValue,
                            branding: false,
                            height: 500,
                            menubar: true,
                            plugins: [ 'images', 'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'anchor' ],
                            toolbar: 'undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                            content_style: 'body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }'
                        }}
                        onEditorChange={onchange}
                    />
                )}
            />
        </div>
    )
}