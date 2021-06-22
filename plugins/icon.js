const plugin = require('tailwindcss/plugin');

module.exports = plugin(function({ addBase }) {
    const icon = {
        '.icon': {
            width: '1em',
            height: '1em',
            verticalAlign: '-0.125em',
            overflow: 'hidden',
            fill: 'currentColor',
            lineHeight: '1',
            display: 'block'
        }
    }
    addBase(icon);
})