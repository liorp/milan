import React from 'react'
import { useLogo } from '../hooks/useLogo'

export const Milan = () => {
    const logo = useLogo()

    return (
        <h1 className="mb-1 min-h-fit leading-loose w-max bg-black dark:bg-gradient-to-r from-green-300 via-yellow-300 to-pink-300 text-gradient text-3xl font-bold transition transform hover:-rotate-6">
            {logo}
        </h1>
    )
}
