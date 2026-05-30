import React, { useId } from 'react'

function Select({
    options,
    label,
    className = '',
    ...props
}, ref) {
    const id = useId()

    return (
        <div className='flex gap-1 items-center'>
            {label && <label className='font-medium' htmlFor={id}>{label}:</label>}
            <select 
                id={id} 
                ref={ref} 
                {...props} 
                className={`outline-none rounded-md py-1 pr-8 border border-[#555555] hover:border-black duration-300 ${className}`}
            >
                <option value='' disabled>
                    Choose status
                </option>

                {options?.map((option) => (
                    <option value={option} key={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)