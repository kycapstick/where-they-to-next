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
                grey: {
                    faint: 'rgba(196,196,196,0.1)'
                }
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
        require('./plugins/container')
    ],
    corePlugins: {
        // Removes the core tailwind class of container as it doesn't work for what we need.
        container: false
    }
}
