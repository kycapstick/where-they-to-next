import { useSession } from 'next-auth/client'
import ProfileModal from './modal'

import ButtonLink from "@/components/button-link";
import EditButton from "@/components/buttons/edit";

export default function ProfileTitle({ title, types, owner = false, accentColor = '#000000', modal, following = false  }) {
    const [ session, loading ] = useSession();
    console.log(types);
    return (
        <div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <h1 className="h1">{title}</h1>
                    { modal && modal.type ?
                        <ProfileModal  
                            type={ modal.type} 
                            accentColor={accentColor}
                            title={modal.title} 
                            description={modal.description} 
                            link={modal.tips_link} 
                        /> 
                        : 
                        null
                    }
                </div>
                <div>
                    { owner ? 
                        <EditButton 
                            href="/"
                            accentColor={accentColor}
                        /> 
                        : 
                        null 
                    } 
                </div>
            </div> 
            {
                types && types.length > 0 &&
                <ul className="pt-3">
                    {
                        types.map((type, index) => (
                            <li key={`performer-tag-${index}`} style={{color: accentColor}}>
                                {/* TODO - Add link to events filtered by tag */}
                                <a className="paragraph" href="#">{`#${type.name}`}</a>
                            </li>
                        ))
                    }
                </ul>
 
            }
        </div>
    )
}
