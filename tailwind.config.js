/** @type {import('tailwindcss').Config} */
export default {
    separator: '_',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            'W': '#fff',
            'Wf': '#f1f1f1',
            'B': '#000',
            'Bc': '#c4c4c4',
        },
        extend: {},
    },
    plugins: [],
}