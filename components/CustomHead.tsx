import Head from 'next/head'

export const CustomHead = () => {
    return (
        <Head>
            <title>מילן</title>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />

            <meta property="og:title" content="milan" />
            <meta name="description" content="a cool game of words!" />
            <meta property="og:url" content="https://milan.liorp.dev/" />
            <meta property="og:description" content="a cool game of words!" />
            <meta property="og:image" content="/icons/favicon.png" />
            <meta property="og:locale" content="he_IL" />
            <meta name="theme-color" content="#9266cc" />

            <link rel="manifest" href="/manifest.json" />
            <link
                rel="apple-touch-icon"
                href="/icons/apple-touch-icon.png"
            ></link>

            <link rel="icon" href="/icons/favicon.ico" />

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin="anonymous"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700;800&display=swap"
                rel="stylesheet"
            />
        </Head>
    )
}
