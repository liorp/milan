import { Game } from '../components/Game'
import { DateTime } from 'luxon'
import words from '../resources/words.json'
import { GameExplanation } from '../components/GameExplanation'
import { WordContext } from '../hooks/useWord'
import { ThemeProvider } from '../hooks/useTheme'
import { CustomHead } from '../components/CustomHead'
import rainbow from '../lib/rainbow'
import { LogoContext } from '../hooks/useLogo'
import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async () => {
    const today = DateTime.now().ordinal

    const word = words[today % words.length]

    return {
        props: {
            word,
        },
        revalidate: 200, // In seconds
    }
}

export default function Home({ word }: { word: string }) {
    console.log(
        '%c' + ` If you liked this game, pay a visit to my blog :)\n.`,
        rainbow
    )
    return (
        <>
            <CustomHead />
            <ThemeProvider>
                <WordContext.Provider value={word}>
                    <LogoContext.Provider value="מילן">
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
