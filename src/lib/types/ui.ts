export interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    hover?: boolean;
}

export interface CardProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
    hover?:boolean
}

export interface BadgeProps {
    variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
    children: React.ReactNode;
    className?: string;
}

export interface InputProps {
    variant?: 'default' | 'filled' | 'outline' | 'underline';
    status?: 'success' | 'warning' | 'error';
    label?: string;
    placeholder?: string;
    helperText?: string;
    className?: string;
    disabled?: boolean;
    required?: boolean;
    size?: 'sm' | 'md' | 'lg';
    children?: React.ReactNode;
}

