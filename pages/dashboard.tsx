import Nav from '@/components/nav'
import Container from '@/components/container'
import DashboardLists from '@/components/dashboard-lists';

import { useEntries } from '@/lib/swr-hooks'

export default function DashboardPage() {
    const artists = useEntries('artists');
    const families = useEntries('families');
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
                    title="Families"
                    entries={families.entries}
                    isLoading={families.isLoading}
                    route="families"
                />
            </Container>
        </>
    )
}