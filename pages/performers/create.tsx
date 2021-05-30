import { useSession } from 'next-auth/client'
import { useState } from 'react';

const { uploadImage } = require('../../scripts/image-upload');

// Components
import Nav from '@/components/nav'
import Container from '@/components/container'
import ImageUploader from '@/components/image-uploader';

export default function DashboardPage() {
    const [ session, loading ] = useSession();
    const [ errors, setErrors ] = useState([]);


    return (
        <>
            <Nav />
            <Container className="w-full lg:w-2/4">
                { session && session.id ?                
                    <form action="">
                        <ImageUploader 
                            user_id={session.id ? session.id : null }
                        />
                    </form> 
                    : 
                    <p>Loading...</p>
                }
            </Container>
        </>
    )
}