import Autocomplete from '@/components/autocomplete';
import DynamicIcon from '@/components/icons/DynamicIcon';

export default function Tags({ name, label, type, selections, makeSelection, accentColor }) {
    const handleKeypress = (e) => {
        return new Promise(async(resolve, reject) => {
            if (e.keyCode === 13) {
                e.preventDefault();
                try {
                    if (e.target.value && e.target.value !== '') {
                        const resp = await fetch(`/api/${type}/create`, {
                            method: 'POST',
                            body: JSON.stringify({
                                name: e.target.value,
                            })
                        })
                        const { insertId } = await resp.json();
                        makeSelection([...selections, { name: e.target.value, id: insertId }]);
                    }
                } catch(err) {
                    console.log(err);
                }
                
            }
        })
    }

    const removeItem = (e) => {
        e.preventDefault();
        const target = e.target.classList.contains('icon') ? e.target.parentNode : e.target;
        const updatedSelections = selections.filter((selection) => Number(selection.id) !== Number(target.dataset.id));
        makeSelection(updatedSelections);
    }

    return (
        <div className="mt-8"> 
            <h2 className="h3 text-center">Tags</h2>
            <ul className="mt-8 flex">
                { 
                    selections && selections.length > 0 ?
                    
                        selections.map((selection, index) => (
                            <li key={index} className="paragraph nth-child-2:ml-6 flex items-center group" style={{ color: accentColor }}>{`#${selection.name}`} <button role="button" className="ml-4 text-white p-2 rounded-full opacity-0 group-hover:opacity-100  transition-opacity duration-4" style={{ backgroundColor: accentColor }} data-id={selection.id} onClick={ removeItem }><DynamicIcon type="close" /></button></li>
                        ))
                        : <li className="text-center italic">You have not yet added any tags.</li>
                }
            </ul>

            <Autocomplete 
                name={name}
                label={label}
                type={type}
                selections={selections}
                makeSelection={makeSelection}
                onKeypress={handleKeypress}
            />
        </div>
    )
}