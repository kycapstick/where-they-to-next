import Link from 'next/link'
import ProfileTitle from './title';
import { useSession } from 'next-auth/client'

import FollowButton from '@/components/follow-button';

export default function Profile({ entry }) {
    const [ session, loading ] = useSession();
    return (
        <>  
            <ProfileTitle 
                title={entry.name}
                owner={ entry.user_id && session && session.id && Number(entry.user_id) === Number(session.id)}
                accentColor={entry.accent_color}
                modal={entry.tips || entry.tips_link ? { type: 'tips', title: `Tip ${entry.name}`, description: entry.tips, link: entry.tips_link } : null }
            />
            {
                session && session.id &&
                    <FollowButton 
                        route="performers"
                        accentColor={entry.accent_color}
                        entry_id={entry.id}
                        user_id={session.id}
                    />
            }
            <div className="flex">
                <p>{entry.bio}</p>
            </div>
        </>
    )
}
