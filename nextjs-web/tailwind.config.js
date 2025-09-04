module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                palletteGray: "#202020",
                palletteDark: "#1A1A1A",
                palletteSecDark: "#232424",
                palletteLight: "#949494",
                palletteSecLight: "#DDDEE2",
            },
        },
    },
    plugins: [],
}
