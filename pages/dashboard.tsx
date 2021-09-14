import Nav from '@/components/nav'
import Container from '@/components/container'
import DashboardLists from '@/components/dashboard-lists';
import { useSession } from 'next-auth/client'

import { useEntries } from '@/lib/swr-hooks'

export default function DashboardPage() {
    const [ session, loading ] = useSession();
    const artists = useEntries('artists');
    const families = useEntries('families');
    if (!session) {
        return (
            <>
                <Nav />
                <Container>
                    <h1>You must be logged in.</h1>
                </Container>
            </>
        )
    }
 
    return (
        <>
            <Nav />
            <Container>
                <DashboardLists 
                    title="Artist"
                    entries={artists.entries}
                    isLoading={artists.isLoading}
                    route="artists"
                />
                <DashboardLists 
                    title="Family"
                    entries={families.entries}
                    isLoading={families.isLoading}
                    route="families"
                />
            </Container>
        </>
    )
}