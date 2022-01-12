import { useCallback } from 'react'
import { DarkModeSwitch } from 'react-toggle-dark-mode'
import { useTheme } from '../hooks/useTheme'

export const DarkModeToggle = () => {
    const { theme, setTheme } = useTheme()

    const toggleDarkMode = useCallback((checked: boolean) => {
        setTheme(checked ? 'dark' : 'light')
    }, [])

    return (
        <DarkModeSwitch
            checked={theme === 'dark'}
            onChange={toggleDarkMode}
            size={40}
            className="mr-2 ml-2"
        />
    )
}
