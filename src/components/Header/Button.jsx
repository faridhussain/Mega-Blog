export default function Button({
    children, 
    type = 'button',
    bgColor = 'bg-[#4A6CF7]',
    textColor = 'text-white',
    className = '',
    ...props
}) {
    return (
        <button type={type} className={`px-4 py-2 rounded-md font-medium duration-300 text-lg hover:opacity-90 cursor-pointer ${className} ${bgColor} ${textColor}`} {...props}>{children}</button>
    )
}