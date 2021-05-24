import { useRouter } from 'next/router'
import Nav from '@/components/nav'
import Container from '@/components/container'

import { useEntry } from '@/lib/swr-hooks'
import { useSession } from 'next-auth/client'
import Profile from '@/components/profile';

export default function DashboardPage() {
    const router = useRouter();
    const { id } = router.query;
    const { entry, isLoading } = useEntry(`${id}`, 'performers');
    const [ session, loading ] = useSession();
    return (
        <>
            <Nav />
            {!session && <><p>Loading</p></> }
            {session && <>
                    <Container className="w-full lg:w-2/4">
                    { !isLoading && entry[0] ?
                        <Profile 
                            entry={entry[0]} 
                            owner={entry[0].user_id && Number(entry[0].user_id) === Number(session.id)}
                        />
                        :
                        <p>Loading...</p>
                    }
                    </Container> 
                </>
            }
        </>
    )
}