export default function TextInput({ name, label, value, onChange, onBlur = () => {}, onKeypress= (e) => {}, helperText = null, error = false, disabled = false }) {
    const handleChange = (e) => {
        e.preventDefault();
        onChange(e.target.value);
    }
    return (
        <div className="flex-col flex-grow mt-8">  
            <label className="mr-2 block label" htmlFor="name">{label}</label>
            <input className="border block border-pink-400 flex-grow w-full p-3 mt-4" type="text" name={name} id={name} onChange={handleChange} onBlur={onBlur} value={value} onKeyDown={onKeypress} disabled={disabled} />
            {
                helperText && !error && <p>{ helperText }</p>
            }
            { 
                error && <p className="text-red">This field is required.</p>
            }
        </div>
    )
}
