import { useSession } from 'next-auth/client'
import ProfileModal from './modal'
import EditButton from "@/components/buttons/edit";

export default function ProfileTitle({ title, types, slug, accentColor = '#000000', modal, owner = false, following = false  }) {
    const [ session, loading ] = useSession();
    return (
        <div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <h1 className="h1">{title}</h1>
                    { modal && modal.type && !owner ?
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
                    { owner && 
                        <EditButton 
                            href={`/artists/edit/${slug}`}
                            accentColor={accentColor}
                        />  
                    }
                </div>
                
            </div> 
            {
                types && types.length > 0 &&
                <ul className="pt-3 flex">
                    {
                        types.map((type, index) => (
                            <li key={`artist-tag-${index}`} className="nth-child-2:ml-4" style={{color: accentColor}}>
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
