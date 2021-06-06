import contrastChecker from '../../scripts/contrastChecker';

import { checkForErrors, clearErrors } from '../../scripts/utilities';

export default function ColorPicker({ value, setValue, errors, setErrors }) {
    const handleChange = (e) => {
        const ContrastCheck = new contrastChecker(e.target.value);
        const contrast = ContrastCheck.checkContrast();
        if (!contrast) {
            if ( checkForErrors(errors, 'accent_color')) {
                setErrors([...errors, { name: 'accent_color', value: value}]);
            }
            setValue(e.target.value)
            return;
        } 
        setErrors(clearErrors(errors, 'accent_color'));
        setValue(e.target.value);
    }
    return (
        <div className="block">
            <h2 className="text-center text-3xl">Accent Color</h2>
            <p className="italic text-center">Add an accent color for this profile. For accessibility purposes, this color will need meet a certain contrast ratio against a white background.</p>
            <div className="py-4">
                <label htmlFor="accent_color" className="mr-4">Accent Color</label>
                <input id="accent_color" name="accent_color" type="color" value={value} onChange={handleChange}/>
                {
                    checkForErrors(errors, 'accent_color') ? null : <p className="text-red italic">This color does not meet the contrast ratio for accessibility. Try a darker shade.</p>
                }
            </div>
        </div>
    )
}