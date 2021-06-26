export default function TextareaInput({ name, label, value, onChange, helperText = null, error = false }) {
    const handleChange = (e) => {
        e.preventDefault();
        onChange(e.target.value);
    }
    return (
        <div className="">  
            <label className="label block text-left" htmlFor={name}>{ label }</label>
            <textarea 
                    className="border-grey-50 border block w-full mt-2 p-4 paragraph" 
                    id={name} 
                    name={name}
                    onChange={handleChange}
                    value={value}
                    rows={10}
            >
            </textarea>
            {
                helperText && !error && <p>{ helperText }</p>
            }
            { 
                error && <p className="text-red">This field is required.</p>
            }


        </div>
    )
}
