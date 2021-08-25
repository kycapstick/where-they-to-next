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
            <h2 className="text-center mt-8 h3">Accent Color</h2>
            <p className="text-center">Add an accent color for your profile.</p>
            <div className="py-8">
                <div className="flex justify-center items-center">
                    <label htmlFor="accent_color" className="label mr-4">Color</label>
                    <div className="inline-block" style={{ backgroundColor: value, borderRadius: '50%' }}>
                        <input id="accent_color" name="accent_color" className="border-0 opacity-0" type="color" value={value}  onChange={handleChange} style={{ height: '50px', width: '50px'}}/>
                    </div>
                </div>
                {
                    checkForErrors(errors, 'accent_color') ? <p className="mt-4 italic text-center">Note: To ensure accessibility, this color will need meet a contrast ratio of at least 3.0 against a white background.</p> : <p className="text-error-400 mt-4 italic text-center">This color does not meet the contrast ratio for accessibility. Try a darker shade.</p>
                }
            </div>
        </div>
    )
}