import { useState } from "react";
import { generateId } from "../utils/apps.utils";
import { EyeClosed, EyeOpen } from "./icons";

export function Input({ onChange = () => { }, value, name, placeHolder, type, showPassword, maxLength, disabled = false, required = true, customDivClass = '', label }: InputPropTypes) {
    const id = generateId();
    const [isVisible, setVisible] = useState(false)
    return (
        <>
            {label && (
                <label htmlFor={id} className="text-sm lg:text-base font-medium">
                    {label}
                </label>
            )}
            <div className={`relative ${customDivClass}`}>
                {type === 'password'
                    ?
                    isVisible ? <span onClick={() => setVisible(false)}><EyeOpen /></span> : <span onClick={() => setVisible(true)}><EyeClosed /></span> : null}
                <input
                    className="outline-none h-10 flex items-center pl-2 lg:pl-4 border rounded text-base font-normal w-full focus:ring-neutral-800 focus:border-black focus:border-2 mb-6 mt-2"
                    placeholder={placeHolder}
                    name={name}
                    onChange={(e: any) => onChange(e)}
                    value={value}
                    disabled={disabled}
                    required={required}
                    type={!isVisible ? type : 'text'}
                    maxLength={Number(maxLength) || 524288}
                />
            </div>
        </>
    )
}

interface InputPropTypes {
    type?: 'text' | 'email' | 'password' | 'date' | 'number';
    label?: string;
    disabled?: boolean;
    required?: boolean;
    maxLength?: number;
    value?: string | number;
    showPassword: boolean;
    placeHolder?: string;
    name?: string;
    customDivClass?: string,
    onChange?: Function;
}