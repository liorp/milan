import '../styles/globals.css'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import * as gtag from '../lib/gtag'
const isProduction = process.env.NODE_ENV === 'production'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
    const router = useRouter()

    useEffect(() => {
        const handleRouteChange = (url: URL) => {
            /* invoke analytics function only for production */
            if (isProduction) gtag.pageview(url)
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...pageProps} />
}

export default MyApp
