import { useEntries } from '@/lib/swr-hooks';
import Checkbox from '@/components/checkbox';
import TextareaInput from '../textarea';

export default function Accessibility({ features, setFeatures, accessibilityDescription, setAccessibilityDescription }) {
    const accessibility = useEntries('accessibility');
    const handleChange = (checked, e) => {
        const id = e.target.id.split('-')[1];
        if (checked) {
            setFeatures([...features, Number(id) ])
            return;
        }
        setFeatures(features.filter((feature) => feature !== Number(id)));
    }
    return (
        <div>
            <h2 className="h3 text-center">Accessibility</h2>
            <p className="text-center">Accessible features come directly from the <a className="underline" href="https://accessnow.com/definitions/">AccessNow definitions</a>.</p>
            {
                accessibility?.entries && accessibility.entries.length > 0 &&
                <fieldset className="mt-8">
                    <legend className="label mb-3">Accessibility features</legend>
                    <ul className="flex flex-wrap justify-between">
                        {
                            accessibility.entries.map((accFeature, index) => {
                                return (
                                    <li key={`acc-feature-${index}`} className="flex-one-third nth-child-4:mt-3">
                                        <Checkbox 
                                            id={`feature-${accFeature.id}`}
                                            name={accFeature.name}
                                            label={accFeature.name}
                                            value={features.indexOf(Number(accFeature.id)) !== -1}
                                            setValue={handleChange}
                                        />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </fieldset>
            }
            <div className="mt-6">
                <TextareaInput 
                    name="accessibility-description"
                    value={accessibilityDescription}
                    onChange={setAccessibilityDescription}
                    label="Accessibility Description"
                    helperText="Please provide as many details as you can about accessibility such as the number of floors, number of stairs between each, and any accomodations that may be available."
                />
            </div>
        </div>
    )
} 
