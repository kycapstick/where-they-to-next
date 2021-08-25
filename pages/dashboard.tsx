import Nav from '@/components/nav'
import Container from '@/components/container'
import DashboardLists from '@/components/dashboard-lists';

import { useEntries } from '@/lib/swr-hooks'

export default function DashboardPage() {
    const artists = useEntries('artists');
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
            </Container>
        </>
    )
}