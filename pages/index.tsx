import Skeleton from 'react-loading-skeleton'

import Nav from '@/components/nav'
import Container from '@/components/container'

import { usePerformers } from '@/lib/swr-hooks'

import { signIn, signOut, useSession } from 'next-auth/client'


export default function IndexPage() {
    const [ session, loading ] = useSession();

    return <>
        {!session && <>
            Not signed in <br/>
                <button onClick={() => signIn()}>Sign in</button>
            </>}
        {session && <>
            Signed in as {session.user.email} <br/>
            <button onClick={() => signOut()}>Sign out</button>
            </>
        }
    </>
}
