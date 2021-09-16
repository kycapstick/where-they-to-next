import { useState } from 'react';

import Input from '@/components/text-input';
import Families from './families';
import Artists from './artists';

function Autocomplete({
    makeSelection,
    type,
    selections,
    label,
    name,
    onKeypress = function(e) { }
}) {
    const [ value, setValue] = useState('');
    const [ options, setOptions ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ active, setActive ] = useState(false);

    const getOptions = async (signal) => {
        try {
            const result = await fetch(`/api/search?type=${type}&q=${value}`, { signal: signal });
            const allOptions = await result.json();
            setOptions(allOptions);
            setLoading(false);
        } catch(err) {
            setLoading(false)
        }   
    }
    let timeOutId;
    let controller = new AbortController();
    let signal = controller.signal;
    const handleChange = (value) => {
        setValue(value);
        setOptions([]);
        if (value && value.length > 2) {
            clearTimeout(timeOutId);
            controller.abort();
            timeOutId = setTimeout(() => { 
                controller = new AbortController();
                signal = controller.signal;
                getOptions(signal);
            }, 3000)
        } 
    }

    const handleSelection = (e) => {
        e.preventDefault();
        if (selections.filter((selection) => selection.id === e.target.dataset.id ).length > 0) {
            return;
        }
        makeSelection([...selections, { name: e.target.dataset.name, id: e.target.dataset.id}]);
        setOptions([]);
        setValue('');
    }


    const removeItem = (e) => {
        e.preventDefault();
        const target = e.target.classList.contains('icon') ? e.target.parentNode : e.target;
        const updatedSelections = selections.filter((selection) => Number(selection.id) !== Number(target.dataset.id));
        console.log(target);
        makeSelection(updatedSelections);
    }

    return (
        <>
            {
                type === 'families' &&
                <Families 
                    entries={selections}
                    removeItem={removeItem}
                />
            }
            {
                type === 'artists' &&
                <Artists 
                    entries={selections}
                    removeItem={removeItem}
                />
            }
            <Input
                name={name}
                label={label}
                value={value}
                onChange={handleChange}
                onFocus={ () => setActive(true) }
                onBlur={() => setActive(false)}
                disabled={loading}
                onKeypress={onKeypress}
            />
            <div className="relative">
                <ul className="absolute inset-0">
                    { options.length > 0 && options.map((option) => (
                        <li className={`${active ? 'block' : 'hidden'} paragraph border border-grey-50 border-t-0 bg-white`} key={option.id}><a className="block w-full py-2 px-4  bg-white hover:bg-grey-10" data-id={option.id} data-name={option.name}  onMouseDown={handleSelection} href='#'>{option.name}</a></li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Autocomplete
