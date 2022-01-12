import {
    createContext,
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
    useContext,
} from 'react'

type Theme = 'dark' | 'light'

const getInitialTheme = (): Theme => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const storedPrefs = window.localStorage.getItem('color-theme')
        if (typeof storedPrefs === 'string') {
            return storedPrefs as Theme
        }

        const userMedia = window.matchMedia('(prefers-color-scheme: dark)')
        if (userMedia.matches) {
            return 'dark'
        }
    }

    return 'light' // light theme as the default;
}

export const ThemeContext = createContext<{
    theme: Theme
    setTheme?: Dispatch<SetStateAction<Theme>>
}>({ theme: 'dark' })

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(getInitialTheme)

    const rawSetTheme = (rawTheme) => {
        const root = window.document.documentElement
        const isDark = rawTheme === 'dark'

        root.classList.remove(isDark ? 'light' : 'dark')
        root.classList.add(rawTheme)

        root.setAttribute('data-theme', rawTheme)

        localStorage.setItem('color-theme', rawTheme)
    }

    useEffect(() => {
        rawSetTheme(theme)
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
