import { useRouter } from 'next/router'
import Nav from '@/components/nav'
import Container from '@/components/container'

import { useEntry } from '@/lib/swr-hooks'
import Profile from '@/components/profile';

export default function DashboardPage() {
    const router = useRouter();
    const { slug } = router.query;
    const { entry, isLoading } = useEntry(`${slug}`, 'venues');
    return (
        <>
            <Nav />
            <Container>
            { entry && entry[0] && !isLoading &&
                <Profile 
                    entry={entry[0]} 
                    route="venues"
                />
            }
            { !isLoading && entry && !entry.length && 
                <p>Sorry, we're having trouble locating that profile.</p>
            }
            { isLoading ? 
                <p>Loading...</p>
                : 
                null
            }
            
            </Container> 
        </>
    )
}