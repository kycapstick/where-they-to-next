import { useSession } from 'next-auth/client'
import { useState } from 'react';

// Components
import Nav from '@/components/nav'
import Container from '@/components/container'
import ImageUploader from '@/components/image-uploader';
import TextInput from '@/components/text-input';

export default function DashboardPage() {
    const [ session, loading ] = useSession();
    const [ errors, setErrors ] = useState([]);
    const [ image, setImage ] = useState(null);
    const [ name, setName ] = useState('');

    return (
        <>
            <Nav />
            <Container className="w-full lg:w-2/4">
                { session && session.id ?
                    <>
                        <h1 className="text-center text-3xl my-3">Create a Performer Profile</h1>                
                        <form action="">
                            <div className="flex py-6">
                                <TextInput 
                                    name="name"
                                    label="Name"
                                    value={name}
                                    onChange={ setName }
                                />
                            </div>
                            <ImageUploader 
                                user_id={session.id ? session.id : null }
                                image={image}
                                setImage={ setImage }
                            />
                        </form>
                    </> 
                    : 
                    <p>Loading...</p>
                    
                }
            </Container>
        </>
    )
}