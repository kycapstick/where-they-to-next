import Link from 'next/link'
import ProfileTitle from './title';

export default function Profile({ entry, owner }) {
    return (
        <>  
            <ProfileTitle 
                title={entry.name}
                owner={owner}
            />
        </>
    )
}
