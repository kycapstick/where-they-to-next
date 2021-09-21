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
import Accessibility from '@/components/accessibility';
import SocialLinks from '@/components/social-links';
import DatePicker from '@/components/date-picker';


export default function CreateEvent() {
    // FIELDS
    // name, description, date, doors, show_time, accent_color
    // tickets, tickets_url  
    // PIVOT FIELDS 
    // families, artists, accessibility, venue 

    const router = useRouter();
    const today = new Date();
    const [ session, loading ] = useSession();
    const [ errors, setErrors ] = useState([]);
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ color, setColor ] = useState('#000000');
    const [ date, setDate ] = useState(``);
    const [ month, setMonth ] = useState('');
    const [ year, setYear ] = useState('');
    const [ doors, setDoors ] = useState('');
    const [ showTime, setShowTime ] = useState('');
    const [ tickets, setTickets ] = useState('');
    const [ ticketsUrl, setTicketsUrl ] = useState('');
    const [ venue, setVenue ] = useState([]);
    const [ venueInfo, setVenueInfo ] = useState({ name: '', id: null});
    const [ image, setImage ] = useState(null);

    // Address
    const [ address, setAddress ] = useState('');
    const [ digital, setDigital ] = useState(false);
    const [ city, setCity ] = useState('')
    const [ province, setProvince ] = useState('');

    // Accessibility
    const [ accessibility, setAccessibility ] = useState([]);
    const [ accessibilityDescription, setAccessibilityDescription ] = useState('');

    // Social Links
    const [ socialLinksId, setSocialLinksId ] = useState(null);
    const [ facebook, setFacebook ] = useState('');
    const [ instagram, setInstagram ] = useState('');
    const [ twitch, setTwitch ] = useState('');
    const [ twitter, setTwitter ] = useState('');
    const [ website, setWebsite ] = useState('');
    const [ youtube, setYouTube ] = useState('');

    const handleVenue = async(selection) => {
        setVenueInfo(selection[0])
        const resp = await fetch(`/api/venues/single?slug=${selection[0].slug}`);
        const result = await resp.json()
        if (result.length > 0) {
            const venue = result[0];
            console.log(venue);
            setAddress(venue.address);
            setCity(venue.city)
            setProvince(venue.province)
            setDigital(venue.digital ? venue.digital : false);
            setAccessibilityDescription(venue.accessibility_description)
        }
    }

    const handleVenueClear = () => {
        setVenueInfo({ name: '', id: null });
        setAddress('')
        setCity('')
        setProvince('');
        setDigital(false);
        setAccessibilityDescription('');

    }
    const createAccessibilityRelationships = async(eventId) => {
        return new Promise(async(resolve, reject) => {
            try {
                await Promise.all(accessibility.map(async(feature) => {
                    const response = await fetch(`/api/accessibility_events/create`, {
                        method: 'POST',
                        body: JSON.stringify({
                            eventId,
                            accessibilityId: feature,
                        })
                    })
                    const result = await response.json();
                    return feature;
                }))
                return resolve(true);
            } catch(err) {
                console.log(err);
                return reject(err);
            }
        });
    }

    const createEvent = async(socials) => {
        return new Promise(async(resolve, reject) => {
            try {
                const response = await fetch(`/api/events/create`, {
                    method: 'POST',
                    body: JSON.stringify({
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
                const result = await response.json();
                const { insertId } = result;
                if (insertId) {
                    if (accessibility && accessibility.length > 0) {
                        await createAccessibilityRelationships(insertId);
                    }

                }
                
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
            await createEvent(socials);
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
                        <h1 className="w-2/3 mx-auto text-center h1 my-3">Create an <span className="block h1">Event</span></h1>                
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
                                select={true}
                                venue={venue}
                                setVenue={handleVenue}
                                venueInfo={venueInfo}
                                setVenueInfo={handleVenueClear}
                            />
                            <ImageUploader 
                                user_id={session.id ? session.id : null }
                                image={image}
                                setImage={ setImage }
                            />
                            <DatePicker 
                                date={date}
                                setDate={setDate}
                                month={month}
                                setMonth={setMonth}
                                year={year}
                                setYear={setYear}
                                doors={doors}
                                setDoors={setDoors}
                                showTime={showTime}
                                setShowTime={setShowTime}
                            />
                            <ColorPicker 
                                value={color}
                                setValue={setColor}
                                errors={errors}
                                setErrors={setErrors}
                            />
                            <Accessibility 
                                features={accessibility}
                                setFeatures={setAccessibility}
                                accessibilityDescription={accessibilityDescription}
                                setAccessibilityDescription={setAccessibilityDescription}
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
                            <input type="submit" value="Create Event" className="border-2 px-6 py-4" style={{ borderColor: color }}/>
                        </form>
                    </> 
                    : 
                    <p>Loading...</p>
                    
                }
            </Container>
        </>
    )
}