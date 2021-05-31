const { breakpoints, spacing } = require("./scripts/constants");

module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
    purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
        colors: {
            'accent-1': '#333',
            'black': {
                trans50: 'rgba(0,0,0,0.5)',
            }
        },
        },
    },
    spacing: spacing,
    variants: {},
    plugins: [],
}
