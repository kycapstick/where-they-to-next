import { useSession } from 'next-auth/client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import absoluteUrl from 'next-absolute-url'

import Nav from '@/components/nav'
import Container from '@/components/container'
import ImageUploader from '@/components/image-uploader';
import TextInput from '@/components/text-input';
import Textarea from '@/components/textarea';
import Autocomplete from '@/components/autocomplete';
import ColorPicker from '@/components/color-picker';
import Tips from '@/components/tips-input';
import SocialLinks from '@/components/social-links';
import BlockButton from '@/components/buttons/block';


export default function EditFamilyPage({ family, slug }) {
    const router = useRouter();

    const [ session, loading ] = useSession();
    const [ errors, setErrors ] = useState([]);
    const [ image, setImage ] = useState(family.image || '');
    const [ name, setName ] = useState(family.name || '');
    const [ description, setDescription ] = useState(family.description || '');
    const [ artists, setArtists ] = useState(family.artists || []) 
    const [ color, setColor ] = useState(family.accent_color || '');
    const [ tips, setTips ] = useState(family.tips || '');
    const [ tipsLink, setTipsLink ] = useState(family.tips_link || '');

    // Social Links
    const [socialLinksId, setSocialLinksId ] = useState(family.social_links_id);
    const [ facebook, setFacebook ] = useState(family.social_links ? family.social_links.facebook : '');
    const [ instagram, setInstagram ] = useState(family.social_links ? family.social_links.instagram : '');
    const [ twitch, setTwitch ] = useState(family.social_links ? family.social_links.twitch : '');
    const [ twitter, setTwitter ] = useState(family.social_links ? family.social_links.twitter : '');
    const [ website, setWebsite ] = useState(family.social_links ? family.social_links.website : '');
    const [ youtube, setYouTube ] = useState(family.social_links ? family.social_links.youtube : '');
    const updateArtistRelationships = async(artists, route) => {
        return new Promise(async (resolve, reject) => {
            try {
                await Promise.all(artists.map(async(artist) => {
                    await fetch(`/api/family_artists/${route}`, {
                        method: 'POST',
                        body: JSON.stringify({
                            familyId: family.id,
                            artistId: artist.id,
                        })
                    })
                    return artist;
                }));
                return resolve(true);
            } catch (err) {
                console.log(err);
                return reject(err);
            }
        })   
    }

    const handleArtists = () => {
        return new Promise(async(resolve, reject) => {
            const currentArtistIds = family.artists.map((artist) => artist.id);
            const newArtistIds = artists.map((artist) => artist.id);
            const newArtists = artists.filter((artist) => currentArtistIds.indexOf(artist.id) === -1);
            const removedArtists = family.artists.filter((artist) => newArtistIds.indexOf(artist.id) === -1);
            try {
                if (newArtists && newArtists.length > 0) {
                    await updateArtistRelationships(newArtists, 'create');
                }
                if (removedArtists && removedArtists.length) {
                    await updateArtistRelationships(removedArtists, 'delete')
                }
                return resolve(true)
            } catch(err) {
                console.log(err);
                return reject(err);
            }
        })
    }

    const editFamily = async(socials) => {
        return new Promise(async(resolve, reject) => {
            try {
                const response = await fetch(`/api/families/edit`, {
                    method: 'POST',
                    body: JSON.stringify({
                        id: family.id,
                        name, 
                        description,
                        tips,
                        tipsLink,
                        image: image && image.id ? image.id : null,
                        color,
                        socials
                    })
                })
                if (response.status !== 200) {
                    return reject('Something went wrong')
                }
                await handleArtists()
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
            await editFamily(socials);
            router.push(`/families/profile/${slug}`)
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
                { session && session.id && session.id === family.user_id ?
                    <>
                        <h1 className="w-2/3 mx-auto text-center h1 my-3">Edit <span className="block h1">Family Profile</span></h1>                
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
                            <ImageUploader 
                                user_id={session.id ? session.id : null }
                                image={image}
                                setImage={ setImage }
                            />
                            <Autocomplete 
                                name="artists"
                                label="Artists"
                                type="artists"
                                selections={artists}
                                makeSelection={setArtists}
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
                            <div className="flex justify-center my-10">
                                <BlockButton 
                                    handleClick={() => {}}
                                    accentColor={color}
                                    text="Update Profile"
                                    type="submit"
                                />
                            </div>
                        </form>
                    </> 
                    : 
                    <p>Loading...</p>
                    
                }
            </Container>
        </>
    )
}

EditFamilyPage.getInitialProps = async ({ query, req }) => {
    const { slug } = query;
    const { origin } = absoluteUrl(req);
    const result = await fetch(`${origin}/api/families/single?slug=${slug}`);
    const response = await result.json();
    return {
        family: response[0],
        slug,
    }
}