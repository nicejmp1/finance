import { ButtonProps } from "@/lib/types/ui";

export function Button({
    variant = 'primary',
    size = 'md',
    children,
    onClick,
    className = '',
    disabled = false,
}: ButtonProps) {
    const baseStyle = 'rounded-lg transition-all duration-200 font-medium cursor-pointer';

    const variants = {
        primary: 'bg-purple-600 text-white hover:bg-purple-700',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        outline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    }

    return (
        <button
            className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
