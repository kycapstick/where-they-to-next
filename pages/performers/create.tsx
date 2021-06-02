import { useSession } from 'next-auth/client'
import { useState } from 'react';

// Components
import Nav from '@/components/nav'
import Container from '@/components/container'
import ImageUploader from '@/components/image-uploader';
import TextInput from '@/components/text-input';
import Textarea from '@/components/textarea';
import Autocomplete from '@/components/autocomplete';
import Tags from '@/components/tags';

export default function DashboardPage() {
    const [ session, loading ] = useSession();
    const [ errors, setErrors ] = useState([]);
    const [ image, setImage ] = useState(null);
    const [ name, setName ] = useState('');
    const [ bio, setBio ] = useState('');
    const [ family, setFamily ] = useState([]) 
    const [ types, setTypes ] = useState([]);
    return (
        <>
            <Nav />
            <Container className="w-full lg:w-2/4">
                { session && session.id ?
                    <>
                        <h1 className="text-center text-3xl my-3">Create a Performer Profile</h1>                
                        <form action="">
                            <div className="py-6">
                                <TextInput 
                                    name="name"
                                    label="Name"
                                    value={name}
                                    onChange={ setName }
                                />
                            </div>
                            <div className="py-6">
                                <Textarea 
                                    name="bio"
                                    label="Bio"
                                    value={bio}
                                    onChange={setBio}
                                />
                            </div>
                            <ImageUploader 
                                user_id={session.id ? session.id : null }
                                image={image}
                                setImage={ setImage }
                            />
                            <Autocomplete 
                                name="family"
                                label="Family"
                                type="families"
                                selections={family}
                                makeSelection={setFamily}
                            />
                            <Tags 
                                name="tags"
                                label="Add performer tags"
                                type="performer_types"
                                selections={types}
                                makeSelection={setTypes}
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