//Sample button component 
import React from 'react'
import { cva, VariantProps } from 'class-variance-authority'

const buttonStyles = cva("font-semibold rounded-lg", {
  variants: {
    intent: {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
      secondary: "bg-white text-blue-800 ring-2 ring-blue-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50",
      soft: "bg-gray-100 text-blue-400 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50",
    },
    btn_size: {
      sm: "text-sm px-2 py-1",
      lg: "text-lg px-4 py-2",
    },
  },
  compoundVariants: [
    {},
  ],
  defaultVariants: {
    intent: "primary",
    btn_size: "lg",
  },
});

interface ButtonProps extends VariantProps<typeof buttonStyles>, React.ButtonHTMLAttributes<HTMLButtonElement>{
  children: React.ReactNode
}

const Button = ({ intent, btn_size, children, onClick, ...props }: ButtonProps) => {

  return (
    <button className={buttonStyles({intent, btn_size})} {...props} onClick={onClick}>{children}</button>
  )
}

export default Button
