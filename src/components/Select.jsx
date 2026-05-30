import React, { useId } from 'react'

function Select({
    options,
    label,
    className = '',
    ...props
}, ref) {
    const id = useId()

    return (
        <div>
            {label && <label className='font-medium' htmlFor={id}>{label}</label>}
            <select 
                id={id} 
                ref={ref} 
                {...props} 
                className={`outline-none rounded-md p-2 border border-[#555555]  hover:border-black duration-300 ${className}`}
            >
                {options?.map((option) => (
                    <option value={option} key={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)