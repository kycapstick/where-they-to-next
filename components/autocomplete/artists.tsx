import DynamicIcon from '@/components/icons/DynamicIcon';

export default function Artists({ entries, removeItem }) {
    console.log(entries);
    return (
        <div className="mt-8">
            <h2 className="text-center h3">Artists</h2>
            <ul className="mt-8">
                { 
                    entries.length > 0 
                    ?
                        entries.map((entry : { name, id  }, index : number | string) => (
                        <li key={index}>{entry.name} <button role="button" className="ml-2" data-id={entry.id} onClick={ removeItem }><DynamicIcon type="close" /></button></li>
                    ))
                    :
                    <li className="italic text-center">You have not selected any artists</li>
                }
            </ul>
        </div>
    )
}