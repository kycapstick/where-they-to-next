export default function Families({ entries }) {
    console.log(entries)
    return (
        <>
            <h2 className="text-center">Current Families</h2>
            <ul>
                { 
                    entries.length > 0 
                    ?
                        entries.map((entry : { name }, index : number | string) => (
                        <li key={index}>{entry.name}</li>
                    ))
                    :
                    <li className="italic text-center">This performer currently does not belong to a family.</li>
                }
            </ul>
        </>
    )
}