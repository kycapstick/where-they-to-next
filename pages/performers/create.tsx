import Nav from '@/components/nav'
import Container from '@/components/container'

import { useEntries } from '@/lib/swr-hooks'

export default function DashboardPage() {
    const performers = useEntries('performers');
    return (
        <>
            <Nav />
            <Container className="w-full lg:w-2/4">
                <p>CREATE A PERFORMER</p>
            </Container>
        </>
    )
}