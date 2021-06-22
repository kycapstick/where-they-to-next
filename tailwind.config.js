const { breakpoints, spacing, duration } = require("./scripts/constants");

module.exports = {
    // future: {
    //     removeDeprecatedGapUtilities: true,
    //     purgeLayersByDefault: true,
    // },
    // purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'accent-1': '#333',
            },
            inset: spacing,
            transitionProperty: {
                follow: 'left, right, top, bottom'
            },
            transitionDuration: duration,
        },
    },
    spacing: spacing,
    variants: {
        inset: ['group-hover', 'hover'],
        padding: ['first'],
        textDecoration: ['group-hover', 'hover'],
        translate: ['group-hover'],
    },
    plugins: [
        require('./plugins/icon'),
        require('./plugins/typography'),
    ],
}
