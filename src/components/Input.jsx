import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = 'text',
    className = '',
    ...props
}, ref) {
    const id = useId()

    return (
        <div className='w-full flex flex-col'>
            {label && <label className='font-medium text-lg' htmlFor={id}>{label}</label>}
            <input 
                type={type} 
                className={`outline-none rounded-md p-2 border border-[#888] hover:border-black duration-300 ${className}`} 
                ref={ref} 
                id={id}
                {...props}
            />
        </div>
    )
})

export default Input