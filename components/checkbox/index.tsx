export default function Checkbox({ id, name, label, value, setValue }) {
    return (
        <>
            <input id={id} name={name} checked={value} className="mr-6" onChange={ (e) => setValue(!value, e) } type="checkbox" />
            <label htmlFor={id}>{ label }</label>
        </>
    )
}