import { useSession } from 'next-auth/client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import absoluteUrl from 'next-absolute-url'

import Nav from '@/components/nav'
import Container from '@/components/container'
import ImageUploader from '@/components/image-uploader';
import TextInput from '@/components/text-input';
import Textarea from '@/components/textarea';
import ColorPicker from '@/components/color-picker';
import SocialLinks from '@/components/social-links';
import BlockButton from '@/components/buttons/block';
import Address from '@/components/address';
import Accessibility from '@/components/accessibility';


export default function EditVenuePage({ venue, slug }) {
    const router = useRouter();

    const [ session, loading ] = useSession();
    const [ errors, setErrors ] = useState([]);
    const [ name, setName ] = useState(venue.name);
    const [ description, setDescription ] = useState(venue.description ? venue.description : '');
    const [ color, setColor ] = useState(venue.accent_color ? venue.accent_color : '#000000');
    const [ image, setImage ] = useState(null);

    // Address
    const [ address, setAddress ] = useState(venue.address);
    const [ digital, setDigital ] = useState(venue.digital);
    const [ city, setCity ] = useState(venue.city)
    const [ province, setProvince ] = useState(venue.province);


    // Accessibility
    const [ accessibility, setAccessibility ] = useState(venue.accessibility && venue.accessibility.length > 0 ? venue.accessibility.map((feature) => feature.id) : []);
    const [ accessibilityDescription, setAccessibilityDescription ] = useState(venue.accessibility_description ? venue.accessibility_description : '');

    // Social Links
    const [socialLinksId, setSocialLinksId ] = useState(venue.social_links_id);
    const [ facebook, setFacebook ] = useState(venue.social_links ? venue.social_links.facebook : '');
    const [ instagram, setInstagram ] = useState(venue.social_links ? venue.social_links.instagram : '');
    const [ twitch, setTwitch ] = useState(venue.social_links ? venue.social_links.twitch : '');
    const [ twitter, setTwitter ] = useState(venue.social_links ? venue.social_links.twitter : '');
    const [ website, setWebsite ] = useState(venue.social_links ? venue.social_links.website : '');
    const [ youtube, setYouTube ] = useState(venue.social_links ? venue.social_links.youtube : '');

    const editVenue = async(socials) => {
        return new Promise(async(resolve, reject) => {
            try {
                const response = await fetch(`/api/venues/edit`, {
                    method: 'POST',
                    body: JSON.stringify({
                        id: venue.id,
                        name, 
                        description,
                        image: image && image.id ? image.id : null,
                        color,
                        socials,
                        digital,
                        address,
                        city, 
                        province,
                        accessibilityDescription
                    })
                })
                if (response.status !== 200) {
                    return reject('Something went wrong')
                }
                return resolve(true);
            } catch(err) {
                console.log(err);
                return reject(err);
            }
        })
    }

    const updateAccessibilityRelationships = async(features, route) => {
        return new Promise(async (resolve, reject) => {
            try {
                await Promise.all(features.map(async(feature) => {
                    await fetch(`/api/accessibility_venues/${route}`, {
                        method: 'POST',
                        body: JSON.stringify({
                            venueId: venue.id,
                            accessibilityId: feature,
                        })
                    })
                    return feature;
                }));
                return resolve(true);
            } catch (err) {
                console.log(err);
                return reject(err);
            }
        })   
    }

    const handleAccessibility = () => {
        return new Promise(async(resolve, reject) => {
            const currentFeatureIds = venue.accessibility.map((feature) => feature.id);
            const newFeatures = accessibility.filter((feature) => currentFeatureIds.indexOf(feature) === -1);
            const removedFeatures = currentFeatureIds.filter((feature) => accessibility.indexOf(feature) === -1);
            try {
                if (newFeatures && newFeatures.length > 0) {
                    await updateAccessibilityRelationships(newFeatures, 'create');
                }
                if (removedFeatures&& removedFeatures.length) {
                    await updateAccessibilityRelationships(removedFeatures, 'delete')
                }
                return resolve(true)
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
            await handleAccessibility();
            await editVenue(socials);
            router.push(`/venues/profile/${slug}`)
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
                { session && session.id && session.id === venue.user_id ?
                    <>
                        <h1 className="w-2/3 mx-auto text-center h1 my-3">Edit <span className="block h1">Venue Profile</span></h1>                
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
                                checkErrors={checkErrors}
                            />
                             <Accessibility 
                                features={accessibility}
                                setFeatures={setAccessibility}
                                accessibilityDescription={accessibilityDescription}
                                setAccessibilityDescription={setAccessibilityDescription}
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

EditVenuePage.getInitialProps = async ({ query, req }) => {
    const { slug } = query;
    const { origin } = absoluteUrl(req);
    const result = await fetch(`${origin}/api/venues/single?slug=${slug}`);
    const response = await result.json();
    return {
        venue: response[0],
        slug,
    }
}