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
import ColorPicker from '@/components/color-picker';
import Tips from '@/components/tips-input';
import SocialLinks from '@/components/social-links';

export default function DashboardPage() {
    const [ session, loading ] = useSession();
    const [ errors, setErrors ] = useState([]);
    const [ image, setImage ] = useState(null);
    const [ name, setName ] = useState('');
    const [ bio, setBio ] = useState('');
    const [ family, setFamily ] = useState([]) 
    const [ types, setTypes ] = useState([]);
    const [ color, setColor ] = useState('#000000');
    const [ tips, setTips ] = useState('');
    const [ tipsLink, setTipsLink ] = useState('');

    // Social Links
    const [socialLinksId, setSocialLinksId ] = useState(null);
    const [ facebook, setFacebook ] = useState('');
    const [ instagram, setInstagram ] = useState('');
    const [ tiktok, setTiktok ] = useState('');
    const [ twitch, setTwitch ] = useState('');
    const [ twitter, setTwitter ] = useState('');
    const [ website, setWebsite ] = useState('');
    const [ youtube, setYouTube ] = useState('');

    const createPerformerTypesRelationships = async(performerId) => {
        return new Promise(async(resolve, reject) => {
            try {
                await Promise.all(types.map(async(type) => {
                    const response = await fetch(`/api/performers_performer_types/create`, {
                        method: 'POST',
                        body: JSON.stringify({
                            performerTypeId: type.id,
                            performerId
                        })
                    })
                    const result = await response.json();
                    return type;
                }))
                return resolve(true);
            } catch(err) {
                console.log(err);
                return reject(err);
            }
        });
    }

    const createFamilyRelationships = async(performerId) => {
        return new Promise(async (resolve, reject) => {
            try {
                await Promise.all(family.map(async(family) => {
                    const response = await fetch(`/api/family_performers/create`, {
                        method: 'POST',
                        body: JSON.stringify({
                            familyId: family.id,
                            performerId,
                        })
                    })
                    const result = await response.json();
                    return family;
                }));
                return resolve(true);
            } catch (err) {
                console.log(err);
                return reject(err);
            }
        })
        
    }

    const createPerformer = async(socials) => {
        try {
            const response = await fetch(`/api/performers/create`, {
                method: 'POST',
                body: JSON.stringify({
                    name, 
                    bio,
                    tips,
                    tipsLink,
                    image: image && image.id ? image.id : null,
                    color,
                    socials
                })
            })
            const result = await response.json();
            const { insertId } = result;
            if (insertId) {
                if (family && family.length > 0) {
                    await createFamilyRelationships(insertId);
                }
                if (types && types.length > 0) {
                    await createPerformerTypesRelationships(insertId);
                }
            }

        } catch(err) {
            console.log(err);
        }
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
                        tiktok, 
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
            createPerformer(socials);
        } catch(err) {
            console.log(err)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const requiredFields = [{name: 'name', value: name }];
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
            <Container className="">
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
                        <h1 className="text-center text-3xl my-3">Create a Performer Profile</h1>                
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
                            <ColorPicker 
                                value={color}
                                setValue={setColor}
                                errors={errors}
                                setErrors={setErrors}
                            />
                            <Tips 
                                tips={tips}
                                tipsLink={tipsLink}
                                setTips={setTips}
                                setTipsLink={setTipsLink}
                            />
                            <SocialLinks 
                                facebook={facebook}
                                setFacebook={setFacebook}
                                instagram={instagram}
                                setInstagram={setInstagram}
                                tiktok={tiktok}
                                setTiktok={setTiktok}
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
                            <input type="submit" value="Create Performer" className="border-2 px-6 py-4" style={{ borderColor: color }}/>
                        </form>
                    </> 
                    : 
                    <p>Loading...</p>
                    
                }
            </Container>
        </>
    )
}