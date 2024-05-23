import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function get_fallback_name(first_name: string | undefined, last_name: string | undefined) {
  return `${first_name && first_name[0].toUpperCase()} ${last_name && last_name[0].toUpperCase()}`
}