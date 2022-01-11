import Head from 'next/head'
import Image from 'next/image'
import { Game } from './Game'

export default function Home() {
    return (
        <div className="flex flex-col h-screen">
            <Head>
                <title>מילן</title>
                <meta name="ilan" content="a cool game" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <main className="text-center m-4">
                <h1 className="m-auto mb-3 min-h-fit leading-loose w-max bg-gradient-to-r from-green-300 via-yellow-300 to-pink-300 text-gradient text-7xl font-bold transition transform hover:-rotate-6">
                    מילן
                </h1>
                <p className="m-auto mb-3 min-h-fit text-xl">
                    זה כמו וורדל אבל בעברית
                </p>
            </main>

            <div className="flex-grow">
                <Game />
            </div>
            <footer className="m-2" dir="ltr">
                <a
                    href="https://liorp.github.io"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    נוצר על ידי ליאור פולק
                </a>
            </footer>
        </div>
    )
}
