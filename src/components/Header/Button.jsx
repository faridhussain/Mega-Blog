export default function Button({
    children,
    type = 'button',
    bgColor = 'bg-[#E05C2A]',
    textColor = 'text-white',
    className = '',
    hoverEffect = 'hover:shadow-[0_0_25px_rgba(219,146,88,0.3)]',
    ...props
}) {
    return (
        <button
            type={type}
            className={`md:px-4 md:py-2 px-2 py-1 rounded-md font-semibold duration-300 cursor-pointer md:text-lg sm:text-base text-base hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 ${bgColor} ${textColor} ${hoverEffect} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}