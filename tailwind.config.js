/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
        extend: {
            animation: {
                slowAppearring: "slowAppearring 3s ease",
            },
            keyframes: {
                slowAppearring: {
                    "0%, 100%": { opacity: "0" },
                    "20%, 80%": { opacity: "100" },
                },
            },
        },
    },
    plugins: [],
};
