const plugin = require('tailwindcss/plugin');
const { breakpoints } = require("../scripts/constants");

module.exports = plugin(function({ addBase }) {
    const margins = [
        {
            width: `${breakpoints.md}px`,
            margin: '25px',
        },
        {
            width: `${breakpoints.lg}px`,
            margin: '150px',
        },
        {
            width: `${breakpoints.xl}px`,
            margin: 'auto'
        }
    ]
    const mediaQueries = margins.map((rule) => {
        return {
            [`@media (min-width: ${rule.width})`]: {
                '.container': {
                    'margin': `0 ${rule.margin}`
                }
            }
        }

    })
    const newUtility = {
        '.container': {
            margin: '0 28px',
            maxWidth: '100%',
            [`@media (min-width: ${breakpoints.xl}px)`]: {
                width: 'calc(100% - 150px)',
                maxWidth: '1770px',
            }
        },
        '.container--full': {
            maxWidth: `${breakpoints.xl}px`,
            margin: '0 auto'
        }
    }
    addBase([newUtility, ...mediaQueries]);
})