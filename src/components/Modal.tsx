import { ReactElement } from 'react';
import { useClickOutside } from '../hooks/useClickOutside';

export default function Modal({ onClose, isShown, children }: PropTypes) {
    if (!isShown) return null

    const domNode = useClickOutside(() => {
        onClose();
    });

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white md:p-10 px-5 py-9 rounded md:max-w-[41rem] w-[90%] relative md:top-[-10rem] top-[-2rem] opacity-100 duration-500 transition-all" ref={domNode}>
                {children}
            </div>
        </div>
    )
}


interface PropTypes {
    onClose: Function;
    children?: ReactElement;
    isShown?: boolean;
}