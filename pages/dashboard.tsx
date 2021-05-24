import Nav from '@/components/nav'
import Container from '@/components/container'
import DashboardLists from '@/components/dashboard-lists';

import { useEntries } from '@/lib/swr-hooks'

export default function DashboardPage() {
    const performers = useEntries('performers');
    return (
        <>
            <Nav />
            <Container className="w-full lg:w-2/4">
                <DashboardLists 
                    title="Performers"
                    entries={performers.entries}
                    isLoading={performers.isLoading}
                />
            </Container>
        </>
    )
}