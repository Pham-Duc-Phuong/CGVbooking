/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTMLInputTypeAttribute } from 'react'
import { UseFormRegister } from 'react-hook-form'
import cn from 'classnames'
type InputProps = {
    id?: string
    label?: string
    className?: string
    type?: HTMLInputTypeAttribute
    register?: UseFormRegister<any>
    placeholder?: string
    error?: string
    hidden?: boolean
    colorLabel?: string
    value?: number
    defaultValue?:any
    disabled?: boolean
}
export const Input = ({
    id,
    label,
    className,
    type = 'text',
    register,
    placeholder,
    error,
    hidden = false,
    colorLabel,
    value,
    defaultValue,
    disabled = false,
}: InputProps) => {
    return (
        <div className={cn("mb-6 sm:h-[60px] h-[50px]", {
            'hidden': hidden === true
        })}>
            {!!label && <label htmlFor={id} className={cn("label",{'text-black': colorLabel === 'black', 'text-white': colorLabel === 'white'})}>{label}</label>}
            <input value={value} type={type} id={id} className={className} placeholder={placeholder} hidden={hidden} {...register?.(id)} defaultValue={defaultValue} disabled={disabled}/>
            {!!error && <p className="text-red-600 text-right py-[5px] text-[11px] sm:text-[16px]">{error}</p>}
        </div>
    )
}
