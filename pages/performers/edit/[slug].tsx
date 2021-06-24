import { useSession } from 'next-auth/client'
import { useState, useEffect } from 'react';

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


export default function EditPerformerPage({ performer }) {
    const [ session, loading ] = useSession();
    const [ errors, setErrors ] = useState([]);
    const [ image, setImage ] = useState(performer.image);
    const [ name, setName ] = useState(performer.name);
    const [ bio, setBio ] = useState(performer.bio);
    const [ family, setFamily ] = useState(performer.families) 
    const [ types, setTypes ] = useState(performer.performer_types ? performer.performer_types : []);
    const [ color, setColor ] = useState(performer.accent_color);
    const [ tips, setTips ] = useState(performer.tips);
    const [ tipsLink, setTipsLink ] = useState(performer.tips_link);

    // Social Links
    const [socialLinksId, setSocialLinksId ] = useState(performer.social_links_id);
    const [ facebook, setFacebook ] = useState(performer.social_links ? performer.social_links.facebook : null);
    const [ instagram, setInstagram ] = useState(performer.social_links ? performer.social_links.instagram : null);
    const [ tiktok, setTiktok ] = useState(performer.social_links ? performer.social_links.tiktok : null);
    const [ twitch, setTwitch ] = useState(performer.social_links ? performer.social_links.twitch : null);
    const [ twitter, setTwitter ] = useState(performer.social_links ? performer.social_links.twitter : null);
    const [ website, setWebsite ] = useState(performer.social_links ? performer.social_links.website : null);
    const [ youtube, setYouTube ] = useState(performer.social_links ? performer.social_links.youtube : null);

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

    const updateFamilyRelationships = async(families, route) => {
        return new Promise(async (resolve, reject) => {
            try {
                await Promise.all(families.map(async(family) => {
                    const response = await fetch(`/api/family_performers/${route}`, {
                        method: 'POST',
                        body: JSON.stringify({
                            familyId: family.id,
                            performerId: performer.id,
                        })
                    })
                    return family;
                }));
                return resolve(true);
            } catch (err) {
                console.log(err);
                return reject(err);
            }
        })   
    }

    const handleFamilies = () => {
        return new Promise(async(resolve, reject) => {
            const currentFamilyIds = performer.families.map((fam) => fam.id);
            const newFamilyIds = family.map((fam) => fam.id);
            const newFamilies = family.filter((fam) => currentFamilyIds.indexOf(fam.id) === -1);
            const removedFamilies = performer.families.filter((fam) => newFamilyIds.indexOf(fam.id) === -1);
            try {
                if (newFamilies && newFamilies.length > 0) {
                    await updateFamilyRelationships(newFamilies, 'create');
                }
                if (removedFamilies && removedFamilies.length) {
                    await updateFamilyRelationships(removedFamilies, 'delete')
                }
                return resolve(true)
            } catch(err) {
                console.log(err);
                return reject(err);
            }
        })

    }

    const createPerformer = async(socials) => {
        try {
            const response = await fetch(`/api/performers/edit`, {
                method: 'POST',
                body: JSON.stringify({
                    id: performer.id,
                    name, 
                    bio,
                    tips,
                    tipsLink,
                    image: image && image.id ? image.id : null,
                    color,
                    socials
                })
            })
            await handleFamilies()
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
            <Container className="" form={true}>
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
                { session && session.id && session.id === performer.user_id ?
                    <>
                        <h1 className="w-2/3 mx-auto text-center h1 my-3">Edit <span className="block h1">Performer Profile</span></h1>                
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
                                name="bio"
                                label="Bio"
                                value={bio}
                                onChange={setBio}
                            />
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

EditPerformerPage.getInitialProps = async (cxt) => {
    const { slug } = cxt.query;
    const result = await fetch(`http://localhost:3000/api/performers/single?slug=${slug}`);
    const response = await result.json();
    return {
        performer: response[0],
    }
}