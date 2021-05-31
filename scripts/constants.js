// BREAKPOINTS
// Defines the project's breakpoints
// Doesn't use units as I need the bare values for fluid type.
module.exports.breakpoints = {
    sm: 375,
    md: 768,
    lg: 1440,
    xl: 1920,
}

// SPACING
// Genereates a spacing object from a base value up to a max
const generateSpacing = (base = 4, max = 20) => {
    const spacing = {};
    for (let i = 1; i <= max; i = i + 1) {
        spacing[i] = `${i * base}px`
    }
    return spacing;
}

module.exports.spacing = generateSpacing(); 