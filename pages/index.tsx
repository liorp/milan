import Head from 'next/head'
import Image from 'next/image'
import { Game } from './Game'

export default function Home() {
    return (
        <div>
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
                <h1 className="m-auto mb-3 min-h-fit leading-loose w-max bg-gradient-to-r from-green-300 via-yellow-300 to-pink-300 text-gradient text-5xl font-bold transition transform hover:-rotate-6">
                    מילן
                </h1>
                <p className="m-auto mb-3 min-h-fit">זה כמו וורדל אבל בעברית</p>
            </main>

            <Game />
            <footer>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span>
                        <Image
                            src="/vercel.svg"
                            alt="Vercel Logo"
                            width={72}
                            height={16}
                        />
                    </span>
                </a>
            </footer>
        </div>
    )
}
