import { Game } from '../../components/Game'
import words from '../../resources/words.json'
import { GameExplanation } from '../../components/GameExplanation'
import { WordContext } from '../../hooks/useWord'
import { ThemeProvider } from '../../hooks/useTheme'
import { CustomHead } from '../../components/CustomHead'
import rainbow from '../../lib/rainbow'
import { LogoContext } from '../../hooks/useLogo'
import { GetStaticPaths, GetStaticProps } from 'next'

const getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const word = words[getRandomInt(0, words.length)]

    return {
        props: {
            word,
            logo: params.id,
        },
        revalidate: 200, // In seconds
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: ['/secret/noga'],
        fallback: 'blocking',
    }
}

export default function Home({ word, logo }: { word: string; logo: string }) {
    console.log('%c' + ` O M G! You found the secret page! \n.`, rainbow)
    return (
        <>
            <CustomHead />
            <ThemeProvider>
                <WordContext.Provider value={word}>
                    <LogoContext.Provider
                        value={logo.replace(/./, (c) => c.toUpperCase())}
                    >
                        <div className="flex flex-col h-full">
                            <GameExplanation />
                            <span className="divider mt-0" />
                            <Game />
                        </div>
                    </LogoContext.Provider>
                </WordContext.Provider>
            </ThemeProvider>
        </>
    )
}
