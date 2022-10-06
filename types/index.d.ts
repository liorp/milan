export {}

declare global {
    interface Window {
        adsbygoogle: any // 👈️ turn off type checking
    }
}
