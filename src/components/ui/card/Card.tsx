import { CardProps } from "@/lib/types/ui";

export function Card({
    title,
    children,
    className = '',
    hover = false,
}: CardProps) {
    return (
        <div 
            className={`
                bg-white rounded-xl 
                shadow-md p-6 ${className}
                ${hover ? 'hover:shadow-lg transition-shadow duration-300' : ''}
            `}
        >
            {title && (
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">
                        {title}
                    </h3>
                </div>
            )}
            <div className="p-6">
                {children}
            </div>
        </div>
    )
}