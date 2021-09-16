export default function Checkbox({ id, name, label, value, setValue }) {
    return (
        <>
            <input id={id} name={name} checked={value} className="mr-6" onChange={ () => setValue(!value) } type="checkbox" />
            <label htmlFor={id}>{ label }</label>
        </>
    )
}