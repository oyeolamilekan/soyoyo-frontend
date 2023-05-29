import { ReactElement } from 'react'
import Loader from './Loader'

export function Button({
    children,
    type = 'submit',
    size = 'full',
    loading = false,
    onClick = () => { },
    customClass = '',
    variant = '',
    disabled = false
}: ButtonPropTypes) {
    const computedClass = ['h-10 bg-black hover:opacity-75 text-white py-2 px-3 rounded transition-all duration-200 flex justify-center font-bold']

    if (variant === 'danger') [
        computedClass.push('bg-red-700')
    ]

    if (variant === 'outline') {
        computedClass.push('bg-transparent !text-black border')
    }

    if (size === 'full') {
        computedClass.push('w-full')
    }
    return (
        <button type={type} className={`${computedClass.join(' ')} ${loading ? "opacity-50" : ""} ${customClass} text-sm`} disabled={disabled} onClick={(e) => onClick(e)}>
            {loading ? <Loader /> : <span>{children}</span>}
        </button>
    )
}

interface ButtonPropTypes {
    text?: string;
    variant?: string;
    type?: 'submit' | 'reset' | 'button';
    size?: 'full' | 'non-full';
    children?: ReactElement | string;
    loading?: boolean;
    onClick?: React.DOMAttributes<HTMLButtonElement>['onClick'] | Function;
    customClass?: string;
    disabled?: boolean;
}