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
                    10: 'rgba(196,196,196,0.1)',
                    50: 'rgba(109, 104, 117, 0.5)',
                },
                black: {
                    60: 'rgba(0,0,0,0.6)',
                    400: '#000',
                },
                beige: {
                    400: '#ECC8AF'
                },
                pink: {
                    400: '#C98686'
                }
            },
            inset: spacing,
            transitionProperty: {
                follow: 'left, right, top, bottom'
            },
            opacity: {
                10: 0.1,
            },
            transitionDuration: duration,
            spacing: spacing,
        },
        borderColor: theme => ({
            ...theme('colors'),
        }),
    },
    variants: {
        inset: ['group-hover', 'hover'],
        padding: ['first'],
        textDecoration: ['group-hover', 'hover'],
        translate: ['group-hover'],
        margin: ['nth-child-2'],
        backgroundColor: ['disabled', 'hover'],
    },
    plugins: [
        require('./plugins/icon'),
        require('./plugins/typography'),
        require('./plugins/container'),
        require('./plugins/nth-child')
    ],
    corePlugins: {
        // Removes the core tailwind class of container as it doesn't work for what we need.
        container: false
    }
}
