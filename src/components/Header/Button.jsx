export default function Button({
    children,
    type = 'button',
    bgColor = 'bg-[#E05C2A]',
    textColor = 'text-white',
    hoverEffect = 'hover:shadow-[0_0_25px_rgba(219,146,88,0.3)]',
    className = '',
    ...props
}) {
    return (
        <button
            type={type}
            className={`md:px-4 px-2 py-2 rounded-md font-bold duration-300 cursor-pointer md:text-lg sm:text-base text-base hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 ${hoverEffect} ${className} ${bgColor} ${textColor}`}
            {...props}
        >
            {children}
        </button>
    )
}