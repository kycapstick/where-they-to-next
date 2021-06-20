import Autocomplete from '@/components/autocomplete';

export default function Tags({ name, label, type, selections, makeSelection}) {
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
        const updatedSelections = selections.filter((selection) => selection.id !== e.target.dataset.id);
        makeSelection(updatedSelections);
    }

    return (
        <> 
            <Autocomplete 
                name={name}
                label={label}
                type={type}
                selections={selections}
                makeSelection={makeSelection}
                onKeypress={handleKeypress}
            />
            { 
                selections.length > 0 && 
                <ul>
                    {
                        selections.map((selection, index) => (
                            <li key={index}>{`#${selection.name}`} <button role="button" className="ml-2" data-id={selection.id} onClick={ removeItem }>remove</button></li>
                        ))
                    }
                </ul>
            }
        </>
    )
}