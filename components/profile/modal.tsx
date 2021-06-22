import Link from 'next/link'
import ButtonLink from "@/components/button-link";
import { useState } from 'react'
import DynamicIcon from '../icons/DynamicIcon';

export default function ProfileModal({ type, title, description = null, link = null, accentColor = '#000000'  }) {
    const [open, setOpen ] = useState(false);
    return (
        <> 
            <button className="px-4 relative h1 ml-4" style={{ color: accentColor}} aria-label={title} onClick={(e) => { e.preventDefault(); setOpen(true) }}>
                <DynamicIcon 
                    type="filter"
                    xl={true}
                />
            </button>
            {
                open 
                    ?
                    <div className="fixed inset-0 flex items-center p-40 bg-black-trans50">
                        <div className="bg-white p-32 w-full">
                            <button onClick={(e) => { e.preventDefault(); setOpen(false)}}>
                                X
                            </button>
                            <h2>{title}</h2>
                            {
                                description && <p>{description}</p> 
                            }
                            {
                                link && <ButtonLink children="Send Tip"/>
                            }
                        </div>
                    </div>
                    :
                    null
            }
            
        </>
    )
}