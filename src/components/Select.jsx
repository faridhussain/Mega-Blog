import { useState } from 'react'
import { ChevronDown, ChevronUp, Check } from 'lucide-react'

// reusable custom select component used for choosing post status
export default function Select({ options, value, onChange, label }) {
    // controls whether dropdown menu is open or closed
    const [open, setOpen] = useState(false)
    
    // returns a color based on post status
    const getDotColor = (status) => {
        if (status === 'active') return 'bg-green-500'
        return 'bg-orange-500'
    }

    return (
        <div className='relative w-full'>
            {/* display label if provided */}
            {label && (
                <label className='font-medium text-[#595650] uppercase tracking-wider text-sm'>{label}</label>
            )}
            {/* button used to open and close the dropdown */}
            <button
                type='button'
                onClick={() => setOpen(!open)}
                className='w-full mt-1 border border-[#292926] bg-[#0E0D09] hover:border-[#40403a] rounded-md p-3 flex items-center justify-between focus:border-[#716f65] text-gray-400 md:text-base sm:text-sm text-sm duration-300'
            >
                <div className='flex items-center gap-3'>
                    {/* show status color indicator */}
                    {value && (
                        <div className={`w-3 h-3 rounded-full ${getDotColor(value)}`}/>
                    )}
                    <span className='text-[#99A1AF] font-medium capitalize'>{value || 'Choose status'}</span>
                </div>
                {/* rotate icon when dropdown is open */}
                <ChevronDown size={20} className={`text-gray-400 transition-transform duration-300 ease-in-out ${ open ? 'rotate-180' : '' }`}/>
            </button>
            {/* dropdown options */}
            {open && (
                <div className='absolute mt-2 w-full overflow-hidden rounded-md border border-[#4a4a4a] bg-[#1a1a1a] z-50'>
                    {/* render all available options */}
                    {options.map((option) => (
                        <button
                            key={option}
                            type='button'
                            onClick={() => {
                                // update selected value
                                onChange(option)
                                // close dropdown after selection
                                setOpen(false)
                            }}
                            className='w-full px-4 py-4 flex cursor-pointer items-center justify-between hover:bg-[#262626] duration-200'
                        >
                            <div className='flex items-center gap-3'>
                                <div className={`w-3 h-3 rounded-full ${getDotColor(option)}`} />
                                <span className='text-white capitalize'>{option}</span>
                            </div>
                            {/* show check icon for selected option */}
                            {value === option && (
                                <Check size={20} className='text-green-500' />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}