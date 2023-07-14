import { ReactElement } from 'react'
import Loader from './Loader'
import { twMerge } from 'tailwind-merge'

export function Button({
    children,
    type = 'submit',
    size = 'full',
    loading = false,
    onClick = () => { },
    className = '',
    variant = '',
    disabled = false, 
    ...props
}: ButtonPropTypes) {
    const computedClass = ['h-10 bg-black hover:opacity-75 text-white py-2 px-3 rounded transition-all duration-200 text-center font-bold']

    if (variant === 'danger') [
        computedClass.push('bg-red-700')
    ]

    if (variant === 'outline') {
        computedClass.push('bg-transparent text-black border')
    }

    if (size === 'full') {
        computedClass.push('w-full')
    }
    
    return (
        <button type={type} className={twMerge(`${computedClass.join(' ')} ${loading ? "opacity-50" : ""} ${className} text-sm items-center`)} disabled={disabled} onClick={(e) => onClick(e)} {...props}>
            {loading ? <Loader /> : <span className='md:text-sm text-xs'>{children}</span>}
        </button>
    )
}

type ButtonPropTypes = {
    text?: string;
    variant?: string;
    type?: 'submit' | 'reset' | 'button';
    size?: 'full' | 'non-full';
    children?: ReactElement | string;
    loading?: boolean;
    onClick?: React.DOMAttributes<HTMLButtonElement>['onClick'] | Function;
    customClass?: string;
    disabled?: boolean;
} & React.ComponentProps<'button'>;