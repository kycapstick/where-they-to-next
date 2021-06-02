export default function TextInput({ name, label, value, onChange, onBlur = () => {}, onKeypress= () => {}, helperText = null, error = false, disabled = false }) {
    const handleChange = (e) => {
        e.preventDefault();
        onChange(e.target.value);
    }
    return (
        <div className="flex-col flex-grow">  
            <label className="mr-2 block pb-2" htmlFor="name">{label}</label>
            <input className="border-b-2 block border-black flex-grow w-full p-3" type="text" name={name} id={name} onChange={handleChange} onBlur={onBlur} value={value} onKeyDown={onKeypress} disabled={disabled} />
            {
                helperText && !error && <p>{ helperText }</p>
            }
            { 
                error && <p className="text-red">This field is required.</p>
            }


        </div>
    )
}
