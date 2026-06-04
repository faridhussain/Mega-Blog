import React, { useId } from 'react'

// reusable input component used throughout the application
const Input = React.forwardRef(function Input({ label, type = 'text', className = '', ...props }, ref) {
    // generate a unique id to connect label and input
    const id = useId()
    return (
        <div className='w-full flex flex-col gap-1'>
            {/* display input label if provided */}
            {label && (
                <label className='font-medium text-[#595650] tracking-wide md:text-base sm:text-sm text-sm pl-1 uppercase' htmlFor={id}>{label}</label>
            )}
            {/* reusable input field */}
            <input
                type={type}
                className={`outline-none focus:border-[#737267] text-gray-400 md:text-base sm:text-sm text-sm rounded-md p-2 border border-[#272724] bg-[#0E0D09] hover:border-[#3d3d38] duration-300 ${className}`}
                ref={ref}
                id={id}
                {...props}
            />
        </div>
    )
})

export default Input