import Link from 'next/link'
import { useSession } from 'next-auth/client'

export default function ProfileTitle({ title = null, owner = false, tags = []  }) {
    const [ session, loading ] = useSession();

    return (
        <>
            { title ? <h1>{title}</h1> : null }
            { owner ? <Link href="/performers/edit">Edit Profile</Link> : null } 
        </>
    )
}
