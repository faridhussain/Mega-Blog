export default function Button({
    children, 
    type = 'button',
    bgColor = 'bg-[#E05C2A]',
    textColor = 'text-white',
    className = '',
    ...props
}) {
    return (
        <button type={type} className={`md:px-4 md:py-2 px-2 py-1 rounded-md font-medium duration-300 md:text-lg sm:text-base text-base hover:-translate-y-0.5 cursor-pointer ${className} ${bgColor} ${textColor}`} {...props}>{children}</button>
    )
}