/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Open Sans", "sans-serif"],
                serif: ["Slabo 27px", "serif"],
                mono: ["Space Mono", "monospace"],
            },
        },
        container: {
            center: true,
            padding: {
                DEFAULT: "1rem",
                sm: "2rem",
                lg: "4rem",
                xl: "5rem",
                "2xl": "6rem",
            },
        },
        colors: {
            slate: colors.slate,
            indigo: "#6366f1",
            "dark-indigo": "#4f46e5",
            teal: "#2dd4bf",
            "dark-teal": "#14b8a6",
            fuchsia: "#e879f9",
            blue: colors.blue,
            red: "#f87171",
            "dark-red": "#ef4444",
        },
    },
    plugins: [],
};
