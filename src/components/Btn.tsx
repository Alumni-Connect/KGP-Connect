import { ReactElement } from "react";
import React from "react"

interface ButtonProps {
  variant: 'primary' | 'secondary' | 'tertiary',
  size: "sm" | "md" | "lg",
  className?:string,
  text: string,
  type?: 'button' | 'submit' | 'reset',
  disabled?: boolean,
  startIcon?: ReactElement,
  endIcon?: ReactElement,
  onClick?: () => void,
}

const variantStyles = {
  "primary": "hover:translate-y-[-6px] hover:shadow-[0_20px_80px_-10px_#2f27ce] bg-indigo-600 text-white hover:shadow-xl transition-all duration-200 ",
  "secondary": "bg-blue-100 text-black-200 hover:translate-y-[-6px]  transition-all duration-200",
  "tertiary": "hover:translate-y-[-6px] hover:shadow-[0_20px_80px_-10px_#2f27ce] bg-red-600 text-white hover:shadow-xl transition-all duration-200 "

}
const size = {
  "lg": "px-5 py-3 text-lg rounded-[12px] ",
  "md": "px-3 py-2 text-md rounded-lg ",
  "sm": "px-2 py-1 text-sm rounded-md ",
}

export default function Button(props: ButtonProps) {
  return (
    <button
      className={`${variantStyles[props.variant] || ''} ${size[props.size] || ''} ${props.className || ''}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.startIcon && <span>{props.startIcon}</span>}
      {props.text}
      {props.endIcon && <span>{props.endIcon}</span>}
    </button>
  );
}
