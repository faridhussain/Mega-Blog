import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = 'text',
    className = '',
    ...props
}, ref) {
    const id = useId()

    return (
        <div className='w-full'>
            {label && <label className='font-medium' htmlFor={id}>{label}</label>}
            <input 
                type={type} 
                className={`outline-none rounded-md p-2 border border-[#555555] hover:border-black duration-300 ${className}`} 
                ref={ref} 
                id={id}
                {...props}
            />
        </div>
    )
})

export default Input