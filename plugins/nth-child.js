const plugin = require('tailwindcss/plugin');

module.exports = plugin(function({ addVariant}) {
    for (let i = 2; i <= 5; i = i + 1) {
        addVariant(`nth-child-${i}`, ({ modifySelectors, separator }) => {
            modifySelectors(({className}) => {
                const css = `.nth-child-${i}\\${separator}${className}:nth-child(n + ${i})`;
                return css;
            })
        })
        addVariant(`nth-child-${i}n`, ({ modifySelectors, separator }) => {
            modifySelectors(({className}) => {
                const css = `.nth-child-${i}n\\${separator}${className}:nth-child(${i}n + 1)`;
                return css;
            })
        })
    }
})