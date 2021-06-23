import DynamicIcon from '@/components/icons/DynamicIcon';

export default function Families({ entries, removeItem }) {
    return (
        <div className="mt-8">
            <h2 className="text-center h3">Family</h2>
            <p className="paragraph text-center mt-1">Family can mean whatever you'd like it to mean.</p>
            <ul className="mt-8">
                { 
                    entries.length > 0 
                    ?
                        entries.map((entry : { name, id  }, index : number | string) => (
                        <li key={index}>{entry.name} <button role="button" className="ml-2" data-id={entry.id} onClick={ removeItem }><DynamicIcon type="close" /></button></li>
                    ))
                    :
                    <li className="italic text-center">You have not selected any families</li>
                }
            </ul>
        </div>
    )
}