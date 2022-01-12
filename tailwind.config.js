module.exports = {
    important: true,
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './controllers/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [require('daisyui')],
}
