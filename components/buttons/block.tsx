import { useState } from 'react';

enum buttonType {
    'button',
    'submit',
    'reset'
}

export default function BlockButton({ accentColor, handleClick, text, type = 'button' }) {
    const [ hover, setHover ] = useState(false);
    return (
        <button
            className={`${hover ? 'text-white border-white' : ''} py-5 px-16 mb-4 text-center border-2 border-black relative font-bold paragraph group transition-all duration-7 ml-3`}
            style={{ backgroundColor: hover ? accentColor : 'white' }}
            onClick={ handleClick }
            // @ts-ignore
            type={type}
            onMouseEnter={ () => setHover(true)}
            onMouseLeave={ () => setHover(false)}
        >
            <span className="w-full h-full absolute inset-0 -z-1 border-2 transform translate-y-3 -translate-x-3 group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform duration-7" style={{ borderColor: accentColor}}></span>
            { text }
        </button>
    )
    
}