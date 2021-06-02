import { useState } from 'react';

import Input from '@/components/text-input';

function Autocomplete({
    makeSelection,
    type,
    selections,
    label,
    name,
    onKeypress = () => {}
}) {
    const [ value, setValue] = useState('');
    const [ options, setOptions ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ tempSelections, setTempSelections ] = useState(selections)
    let timeOutId;
    const handleChange = (value) => {
        setValue(value);
        setOptions([]);
        if (value.length && value.length > 2) {
            clearTimeout(timeOutId);
            timeOutId = setTimeout(async () => { 
                setLoading(true);
                try {
                    const result = await fetch(`/api/search?type=${type}&q=${value}`);
                    const allOptions = await result.json();
                    setOptions(allOptions);
                    setLoading(false);
                } catch(err) {
                    setLoading(false)
                }   
            }, 1000)
        } 
    }

    const handleSelection = (e) => {
        e.preventDefault();
        if (selections.filter((selection) => selection.id === e.target.dataset.id ).length > 0) {
            return;
        }
        makeSelection([...selections, { name: e.target.dataset.name, id: e.target.dataset.id}]);
        setOptions([]);
    }


    const removeItem = (e) => {
        e.preventDefault();
    
        const updatedSelections = selections.filter((selection) => selection.id !== e.target.dataset.id);
        makeSelection(updatedSelections);
    }

    return (
        <>
            {
                selections.length > 0 &&
                <ul>
                    { 
                        selections.map((selection) => (
                            <li key={selection.id}>{selection.name}<button data-id={selection.id} onClick={removeItem}>remove</button></li>
                        ))
                    }
                </ul>
            }
            <Input
                name={name}
                label={label}
                value={value}
                onChange={handleChange}
                onBlur={() => setOptions([])}
                disabled={loading}
                onKeypress={onKeypress}
            />
            {
                options.length > 0 &&
                <ul>
                    { options.map((option) => (
                        <li key={option.id}><a data-id={option.id} data-name={option.name}  onClick={handleSelection} href='#'>{option.name}</a></li>
                    ))}
                </ul>
            }
        </>
    )
}

export default Autocomplete
