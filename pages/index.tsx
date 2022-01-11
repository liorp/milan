import Head from 'next/head'
import Image from 'next/image'
import { Game } from './Game'

export default function Home() {
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name="ilan" content="a cool game" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1>מילן</h1>

                <p>זה כמו וורדל אבל בעברית</p>
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
