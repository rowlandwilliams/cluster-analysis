// const colors = require('tailwindcss/colors');

module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontSize: { '2xs': '0.625rem' },
            fontFamily: {
                'inconsolata-regular': ['Inconsolata-Regular'],
            },
            colors: {
                'chart-gray': '#1D2025',
                'header-gray': '#2A2D36',
                'header-purple': '#512FFF',
                'bg-gray': '#0E0E0E',
                'chart-purple': '#C479FF',
                'chart-red': '#FF6868',
                'chart-yellow': '#FFFA7A',
                'chart-grid-grey': '#9F9F9F',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
