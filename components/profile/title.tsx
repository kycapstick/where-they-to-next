import Link from 'next/link'
import { useSession } from 'next-auth/client'
import ProfileModal from './modal'

import ButtonLink from "@/components/button-link";
import Button from "@/components/button";

export default function ProfileTitle({ title, owner = false, accentColor = '#000000', modal = null, following = false  }) {
    const [ session, loading ] = useSession();
    return (
        <div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <h1>{title}</h1>
                    { modal.type ?
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
                        <ButtonLink 
                            href="/"
                            accentColor={accentColor}
                            children="Edit Profile"
                        /> 
                        : 
                        null 
                    } 
                </div>
            </div> 
        </div>
    )
}
