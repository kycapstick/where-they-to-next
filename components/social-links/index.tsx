import { useEffect, useState, useCallback } from 'react';
import TextInput from '../text-input';

export default function SocialLinks({ facebook, setFacebook, instagram, setInstagram, tiktok, setTiktok, twitch, setTwitch, twitter, setTwitter, website, setWebsite, youtube, setYoutube }) {
    const [ socialLinks, setSocialLinks ] = useState([])
    const fetchSocialLinks = useCallback(async() => {
        try {
            const response = await fetch('/api/social-links');
            const socialLinkEntries = await response.json();
            if (socialLinkEntries.length > 0) {
                setSocialLinks(socialLinkEntries);
            }
        } catch(err) {
            console.log(err)
        }
    }, [])

    const handleSocialLinks = (e) => {
        console.log(e.target.value);
    }
    useEffect(() => {
        fetchSocialLinks()
    }, [fetchSocialLinks])
    return (
        <>
            <h2 className="text-3xl my-10 text-center">Social Links</h2>
            {
                socialLinks.length ?
                <>
                    <label htmlFor="existing-socials">Use existing social media</label>
                    <select name="existing-socials" id="existing-socials" onChange={handleSocialLinks}>
                        {
                            socialLinks.map((socialLink) => (
                                <option value={socialLink.id}>{socialLink.name}</option>
                            ))
                        }
                    </select>
                </>
                : null
            }
            <div className="flex">
                <TextInput name="facebook" label="Facebook" onChange={setFacebook} value={facebook}/>
                <TextInput name="instagram" label="Instagram" onChange={setInstagram} value={instagram}/>
            </div>
            <div className="flex">
                <TextInput name="tiktok" label="TikTok" onChange={setTiktok} value={tiktok}/>
                <TextInput name="twitch" label="Twitch" onChange={setTwitch} value={twitch}/>
            </div>
            <div className="flex">
                <TextInput name="twitter" label="Twitter" onChange={setTwitter} value={twitter}/>
                <TextInput name="youtube" label="YouTube" onChange={setYoutube} value={youtube}/>
            </div>
            <TextInput name="website" label="Website" onChange={setWebsite} value={website}/>


        </>
    )
}