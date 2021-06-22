import Nav from '@/components/nav'
import Container from '@/components/container'
import DashboardLists from '@/components/dashboard-lists';

import { useEntries } from '@/lib/swr-hooks'

export default function DashboardPage() {
    const performers = useEntries('performers');
    return (
        <>
            <Nav />
            <Container>
                <DashboardLists 
                    title="Performer"
                    entries={performers.entries}
                    isLoading={performers.isLoading}
                    route="performers"
                />
            </Container>
        </>
    )
}