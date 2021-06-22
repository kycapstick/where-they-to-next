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
    spacing['auto'] = 'auto';
    for (let i = 1; i <= max; i = i + 1) {
        spacing[i] = `${i * base}px`
    }
    return spacing;
}

module.exports.spacing = generateSpacing(); 

// Duration
// Generates duration values from 0.1 to 1 second

const generateDuration = (max = 9) => {
    const duration = {};
    for (let i = 1; i <= max; i = i + 1) {
        duration[i] = `0.${i}s`
    }
    return duration;
}

module.exports.duration = generateDuration();