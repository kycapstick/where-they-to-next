export default function TextareaInput({ name, label, value, onChange, helperText = null, error = false }) {
    const handleChange = (e) => {
        e.preventDefault();
        onChange(e.target.value);
    }
    return (
        <div className="flex-col flex-grow">  
            <label htmlFor={name}>{ label }</label>
            <textarea 
                    className="border-black border-2 block w-full" 
                    id={name} 
                    name={name}
                    onChange={handleChange}
                    value={value}
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
