import Nav from '@/components/nav'
import Container from '@/components/container'
import { useSession } from 'next-auth/client'
import { useState } from 'react';

const { uploadImage } = require('../../scripts/image-upload');

export default function DashboardPage() {
    const [ session, loading ] = useSession();
    const [ errors, setErrors ] = useState([]);
    const [ uploading, setUploading ] = useState(false);
    const [ imageUrl, setImageUrl ] = useState('');
    const handleImageUpload = async (e) => {
        if (e.target.files && e.target.files.length) {
            setUploading(true);
            try {
                const imageUrl = await uploadImage(e.target.files[0], session.id);
                setImageUrl(imageUrl);
                setUploading(false);

            } catch(err) {
                const tempErrors = errors;
                tempErrors.push(err);
                setErrors(tempErrors);
                setUploading(false);
            }
        }
    }
    return (
        <>
            <Nav />
            <Container className="w-full lg:w-2/4">
                { session && session.id ?                
                    <form action="">
                        {
                            imageUrl !== '' 
                            ?
                            <img src={ imageUrl } alt="" />
                            :
                            null
                            
                        }
                        <input type="file" onChange={handleImageUpload} disabled={uploading} />
                    </form> 
                    : 
                    <p>Loading...</p>
                }
            </Container>
        </>
    )
}