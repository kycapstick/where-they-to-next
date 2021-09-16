import { useSession } from 'next-auth/client'
import { useState } from 'react';
import { useRouter } from 'next/router';

// Components
import Nav from '@/components/nav'
import Container from '@/components/container'
import ImageUploader from '@/components/image-uploader';
import TextInput from '@/components/text-input';
import Textarea from '@/components/textarea';
import Address from '@/components/address';
import ColorPicker from '@/components/color-picker';
import SocialLinks from '@/components/social-links';


export default function CreateVenue() {
    const router = useRouter();

    const [ session, loading ] = useSession();
    const [ errors, setErrors ] = useState([]);
    const [ image, setImage ] = useState(null);
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ color, setColor ] = useState('#000000');

    // Address
    const [ address, setAddress ] = useState('');
    const [ digital, setDigital ] = useState(false);
    const [ city, setCity ] = useState('')
    const [ province, setProvince ] = useState('');
    const [ postalCode, setPostalCode] = useState('');

    // Social Links
    const [socialLinksId, setSocialLinksId ] = useState(null);
    const [ facebook, setFacebook ] = useState('');
    const [ instagram, setInstagram ] = useState('');
    const [ twitch, setTwitch ] = useState('');
    const [ twitter, setTwitter ] = useState('');
    const [ website, setWebsite ] = useState('');
    const [ youtube, setYouTube ] = useState('');

    const createVenue = async(socials) => {
        return new Promise(async(resolve, reject) => {
            try {
                const response = await fetch(`/api/families/create`, {
                    method: 'POST',
                    body: JSON.stringify({
                        name, 
                        description,
                        image: image && image.id ? image.id : null,
                        color,
                        socials
                    })
                })
                const result = await response.json();
                const { insertId } = result;
                // if (insertId) {
                //     if (artists && artists.length > 0) {
                //         await createArtistRelationships(insertId);
                //     }

                // }
                
                return resolve(true);
            } catch(err) {
                console.log(err);
                return reject(err);
            }
        })
    
    }

    const createSocialLinksId = () => {
        return new Promise(async(resolve, reject) => {
            try {
                const response = await fetch(`/api/social_links/create`, {
                    method: 'POST',
                    body: JSON.stringify({
                        name,
                        facebook,
                        instagram,
                        twitch,
                        twitter,
                        website,
                        youtube
                    })
                })
                const result = await response.json();
                const { insertId } = result;
                if (insertId) {
                    setSocialLinksId(insertId);
                    resolve(insertId);
                    return;
                }
                reject('Something went wrong')
                return;
            } catch(err) {
                console.log(err);
                return reject(err);
            }
        })
    }

    const submitForm = async() => {
        try {
            let socials = socialLinksId;
            if (!socialLinksId) {
                socials = await createSocialLinksId();
            }
            await createVenue(socials);
            router.push('/dashboard');
        } catch(err) {
            console.log(err)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const requiredFields = [{name: 'name', value: name }, { name: 'address', value: address }];
        const checkedFields = requiredFields.filter((field) => !field.value || field.value === '');
        if (checkedFields.length > 0) {
            return setErrors(checkedFields);
        }
        submitForm();
    }

    const checkErrors = (e) => {
        if (errors.length > 0) {
            const updatedErrors = errors.filter((error) => error.name !== e.target.name);
            setErrors(updatedErrors);
        }
    }

    return (
        <>
            <Nav />
            <Container className="py-20" form={true}>
                { 
                    errors.length > 0 && 
                    <>
                        <h2>Warning!</h2>
                        <p>This form includes the following <span className="color-red">{errors.length}</span> {errors.length > 1 ? 'errors' : 'error' }</p>
                        <ul>
                            {errors.map((error, index) => (
                                <li key={index}><a href={`#${error.name}`}>The {error.name} field is required.</a></li>
                            ))}
                        </ul>
                    </>
                }
                { session && session.id ?
                    <>
                        <h1 className="w-2/3 mx-auto text-center h1 my-3">Create a <span className="block h1">Venue Profile</span></h1>                
                        <form action="" onSubmit={handleSubmit}>
                            <div className="py-6">
                                <TextInput 
                                    name="name"
                                    label="Name"
                                    value={name}
                                    onChange={ setName }
                                    onKeypress={ checkErrors }
                                />
                            </div>
                            <Textarea 
                                name="description"
                                label="Description"
                                value={description}
                                onChange={setDescription}
                            />
                            <Address 
                                digital={digital}
                                setDigital={setDigital}
                                address={address}
                                setAddress={setAddress}
                                city={city}
                                setCity={setCity}
                                province={province}
                                setProvince={setProvince}
                                postalCode={postalCode}
                                setPostalCode={setPostalCode}
                                checkErrors={checkErrors}
                            />
                            
                            <ImageUploader 
                                user_id={session.id ? session.id : null }
                                image={image}
                                setImage={ setImage }
                            />
                            <ColorPicker 
                                value={color}
                                setValue={setColor}
                                errors={errors}
                                setErrors={setErrors}
                            />
                            <SocialLinks 
                                facebook={facebook}
                                setFacebook={setFacebook}
                                instagram={instagram}
                                setInstagram={setInstagram}
                                twitch={twitch}
                                setTwitch={setTwitch}
                                twitter={twitter}
                                setTwitter={setTwitter}
                                website={website}
                                setWebsite={setWebsite}
                                youtube={youtube}
                                setYoutube={setYouTube}
                                socialLinksId={socialLinksId}
                                setSocialLinksId={setSocialLinksId}
                            />
                            <input type="submit" value="Create Venue" className="border-2 px-6 py-4" style={{ borderColor: color }}/>
                        </form>
                    </> 
                    : 
                    <p>Loading...</p>
                    
                }
            </Container>
        </>
    )
}