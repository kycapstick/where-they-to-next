import { useSession } from 'next-auth/client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

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
import BlockButton from '@/components/buttons/block';


export default function EditArtistPage({ artist, slug }) {
    const router = useRouter();

    const [ session, loading ] = useSession();
    const [ errors, setErrors ] = useState([]);
    const [ image, setImage ] = useState(artist.image || '');
    const [ name, setName ] = useState(artist.name || '');
    const [ bio, setBio ] = useState(artist.bio || '');
    const [ family, setFamily ] = useState(artist.families || []) 
    const [ types, setTypes ] = useState(artist.artist_types ? artist.artist_types : []);
    const [ color, setColor ] = useState(artist.accent_color || '');
    const [ tips, setTips ] = useState(artist.tips || '');
    const [ tipsLink, setTipsLink ] = useState(artist.tips_link || '');

    // Social Links
    const [socialLinksId, setSocialLinksId ] = useState(artist.social_links_id);
    const [ facebook, setFacebook ] = useState(artist.social_links ? artist.social_links.facebook : '');
    const [ instagram, setInstagram ] = useState(artist.social_links ? artist.social_links.instagram : '');
    const [ twitch, setTwitch ] = useState(artist.social_links ? artist.social_links.twitch : '');
    const [ twitter, setTwitter ] = useState(artist.social_links ? artist.social_links.twitter : '');
    const [ website, setWebsite ] = useState(artist.social_links ? artist.social_links.website : '');
    const [ youtube, setYouTube ] = useState(artist.social_links ? artist.social_links.youtube : '');

    const updateArtistTypeRelationships = async(artistTypes, route) => {
        return new Promise(async(resolve, reject) => {
            try {
                await Promise.all(artistTypes.map(async(type) => {
                    await fetch(`/api/artists_artist_types/${route}`, {
                        method: 'POST',
                        body: JSON.stringify({
                            artistTypeId: type.id,
                            artistId: artist.id,
                        })
                    })
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
                    await fetch(`/api/family_artists/${route}`, {
                        method: 'POST',
                        body: JSON.stringify({
                            familyId: family.id,
                            artistId: artist.id,
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
            const currentFamilyIds = artist.families.map((fam) => fam.id);
            const newFamilyIds = family.map((fam) => fam.id);
            const newFamilies = family.filter((fam) => currentFamilyIds.indexOf(fam.id) === -1);
            const removedFamilies = artist.families.filter((fam) => newFamilyIds.indexOf(fam.id) === -1);
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

    const handleArtistTypes = () => {
        return new Promise(async(resolve, reject) => {
            const currentArtistTypeIds = artist.artist_types.map((type) => type.id);
            const newArtistTypeIds = types.map((type) => type.id);
            const newArtistTypes = types.filter((type) => currentArtistTypeIds.indexOf(type.id) === -1);
            const removedArtistTypes = artist.artist_types.filter((type) => newArtistTypeIds.indexOf(type.id) === -1);
            try {
                if (newArtistTypes && newArtistTypes.length > 0) {
                    await updateArtistTypeRelationships(newArtistTypes, 'create');
                }
                if (removedArtistTypes && removedArtistTypes.length > 0) {
                    await updateArtistTypeRelationships(removedArtistTypes, 'delete')
                }
                return resolve(true)
            } catch(err) {
                console.log(err);
                return reject(err);
            }
        })
    }

    const editArtist = async(socials) => {
        return new Promise(async(resolve, reject) => {
            try {
                const response = await fetch(`/api/artists/edit`, {
                    method: 'POST',
                    body: JSON.stringify({
                        id: artist.id,
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
                await handleArtistTypes();
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
            await editArtist(socials);
            router.push(`/artists/profile/${slug}`)
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
                { session && session.id && session.id === artist.user_id ?
                    <>
                        <h1 className="w-2/3 mx-auto text-center h1 my-3">Edit <span className="block h1">Artist Profile</span></h1>                
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
                                label="Add artist tags"
                                type="artist_types"
                                selections={types}
                                makeSelection={setTypes}
                                accentColor={color}
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

EditArtistPage.getInitialProps = async (cxt) => {
    const { slug } = cxt.query;
    const result = await fetch(`http://localhost:3000/api/artists/single?slug=${slug}`);
    const response = await result.json();
    return {
        artist: response[0],
        slug,
    }
}