import { Game } from '../components/Game'
import { DateTime } from 'luxon'
import words_hezi_laplacian from '../resources/words_hezi_laplacian.json'
import { GameExplanation } from '../components/GameExplanation'
import { WordContext } from '../hooks/useWord'
import { ThemeProvider } from '../hooks/useTheme'
import { CustomHead } from '../components/CustomHead'
import rainbow from '../lib/rainbow'
import { LogoContext } from '../hooks/useLogo'
import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async () => {
    const today = DateTime.now().ordinal

    const word = words_hezi_laplacian[today % words_hezi_laplacian.length]

    return {
        props: {
            word,
        },
        revalidate: 200, // In seconds
    }
}

export default function Home({ word }: { word: string }) {
    console.log(
        '%c' +
            ` וואלה אני בישיבה בגבוה עם האחים דודו דוסטן שגיא מנשרוף אורטל ממן תמרה פוריה פתאום באו אליי עם המשחק הזה מילן מה המילה אכלו תראס`,
        rainbow
    )
    return (
        <>
            <CustomHead />
            <ThemeProvider>
                <WordContext.Provider value={word}>
                    <LogoContext.Provider value="חזי לפלסיאן">
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
