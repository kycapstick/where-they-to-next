class ContrastChecker {
    constructor(color) {
        this.color = color;
    }
    calculateLuminance(hue) {
        let luminance = hue / 255;
        if (luminance <= 0.03928) {
            luminance = luminance / 12.92
        } else {
            const base = (luminance + 0.055) / 1.055
            luminance = Math.pow(base, 2.4)
        }
        return luminance;
    }
    compareL(rgb) {
        const luminance = (0.2126 * rgb.r) + (0.7152 * rgb.g) + (0.0722 * rgb.b);
        const contrast = luminance > 1 ? (luminance + 0.05) / 1.05 : 1.05 / (luminance + 0.05);  
        return contrast;
    }
    hexToRgb() {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.color);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    checkContrast() {
        const rgb = this.hexToRgb();
        for (let hue in rgb) {
            const luminance = this.calculateLuminance(rgb[hue]);
            rgb[hue] = luminance;
        }
        const contrast = this.compareL(rgb);
        if (contrast > 3) {
            return true;
        }
        return false;
    }
}

export default ContrastChecker;