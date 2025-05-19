import { InputProps } from "@/lib/types/ui";
import { FaCheck } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { FaTimesCircle } from "react-icons/fa";


export function Input({
    variant = 'default',
    status,
    label,
    placeholder,
    helperText,
    className = '',
    disabled = false,
    required = false,
    size = 'md',
    children,
}: InputProps) {

    const variants = {
        default: 'border border-gray-300 bg-white',
        filled: 'bg-gray-100 border-transparent focus:bg-white focus:border-purple-500',
        outline: 'border border-gray-300',
        underline: 'border-b-2 border-gray-300 rounded-none'
    }

    const statusStyles = {
        success: 'border-green-500 focus:border-green-600',
        warning: 'border-yellow-500 focus:border-yellow-600',
        error: 'border-red-500 focus:border-red-600',
    }

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-5 py-2.5 text-lg',
    }

    const statusColors = {
        success: 'text-green-500',
        warning: 'text-yellow-500',
        error: 'text-red-500',
    }

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <div className="relative">
                <input
                    className={`
                        w-full
                        rounded-lg
                        transition-all duration-200
                        focus:outline-none focus:ring-2 focus:ring-opacity-50
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${variants[variant]}
                        ${status ? statusStyles[status] : ''}
                        ${sizes[size]}
                        ${className}
                    `}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                />
                {status && (
                    <div className={`absolute right-3 top-1/2 -translate-y-1/2 ${statusColors[status]}`}>
                        {status === 'success' && <FaCheck className="w-5 h-5" />}
                        {status === 'warning' && <IoIosWarning  className="w-5 h-5" />}
                        {status === 'error' && <FaTimesCircle className="w-5 h-5" />}
                    </div>
                )}

                {children}
            </div>
            {helperText && (
                <p className={`mt-1 text-sm ${status ? statusColors[status] : 'text-gray-500'}`}>
                    {helperText}
                </p>
            )}
        </div>
    )
}