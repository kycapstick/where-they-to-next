import Nav from '@/components/nav'
import Container from '@/components/container'
import { useSession } from 'next-auth/client'

import { useEntries } from '@/lib/swr-hooks'

export default function DashboardPage() {
    const [ session, loading ] = useSession();
    const performers = useEntries('performers');
    const handleImageUpload = async (e) => {
        if (e.target.files && e.target.files.length) {
            const formData = new FormData();
            formData.append("file", e.target.files[0]);
            formData.append("user_id", `${session.id}`);
            try {
                const uploadFile = await fetch('/api/images/upload', {
                    method: 'POST',
                    body: formData
                });
                const resp = await uploadFile.json();
                console.log(resp);
            } catch (err) {
                console.log(err);
            }
        }
    }
    return (
        <>
            <Nav />
            <Container className="w-full lg:w-2/4">
                { session && session.id ?                
                    <form action="">
                        <input type="file" onChange={handleImageUpload} />
                    </form> 
                    : 
                    <p>Loading...</p>
                }
            </Container>
        </>
    )
}