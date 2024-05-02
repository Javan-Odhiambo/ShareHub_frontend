'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

interface ThemeChangerProps{
  className?: string
}

const ThemeChanger = ({ className } : ThemeChangerProps) => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className={className}>
      <select value={theme} onChange={e => setTheme(e.target.value)} className='p-1 border border-primary-border text-primary-high-contrast-text bg-primary-element-bg hover:bg-primary-hover-bg hover: rounded-md '>
        <option value="system">System</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
    </div>
  )
}

export default ThemeChanger