export default function Families({ entries, removeItem }) {
    return (
        <div className="mt-8">
            <h2 className="text-center h3">Current Families</h2>
            <ul>
                { 
                    entries.length > 0 
                    ?
                        entries.map((entry : { name, id  }, index : number | string) => (
                        <li key={index}>{entry.name} <button role="button" className="ml-2" data-id={entry.id} onClick={ removeItem }>remove</button></li>
                    ))
                    :
                    <li className="italic text-center">This performer currently does not belong to a family.</li>
                }
            </ul>
        </div>
    )
}