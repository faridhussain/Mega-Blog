export default function Button({
    children, 
    type = 'button',
    bgColor = 'bg-[#F56E00]',
    textColor = 'text-white',
    className = '',
    ...props
}) {
    return (
        <button className={`px-5 py-3 rounded ${className} ${bgColor} ${textColor}`} {...props}>{children}</button>
    )
}