import { useEffect, useState, useCallback } from 'react';
import TextInput from '../text-input';

export default function SocialLinks({ facebook, setFacebook, instagram, setInstagram, tiktok, setTiktok, twitch, setTwitch, twitter, setTwitter, website, setWebsite, youtube, setYoutube, socialLinksId, setSocialLinksId }) {
    const [ socialLinks, setSocialLinks ] = useState([])
    const [ loading, setLoading ] = useState(false);
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

    const handleSocialLinks = async(e) => {
        e.preventDefault();
        if (e.target.value === '') {
            setSocialLinksId(null)
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`/api/social_links/single?id=${e.target.value}`)
            const result = await response.json();
            setFacebook(result['facebook'])
            setInstagram(result['instagram'])
            setTiktok(result['tiktok'])
            setTwitch(result['twitch'])
            setTwitter(result['twitter'])
            setWebsite(result['website'])
            setYoutube(result['youtube'])
            setSocialLinksId(result['id']);
            setLoading(false);
        } catch(err) {
            console.log(err);
            setLoading(false);
        }
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
                    <select name="existing-socials" id="existing-socials" onChange={handleSocialLinks} disabled={loading}>
                        <option value="">Select</option>
                        {
                            socialLinks.map((socialLink, index) => {
                                if (socialLinksId && socialLinksId === socialLink.id) {
                                    return (
                                        <option value={socialLink.id} key={`social-links-${index}`} selected>{socialLink.name}</option>
                                    )                                    
                                }
                                return (
                                    <option value={socialLink.id} key={`social-links-${index}`}>{socialLink.name}</option>
                                )
                            })
                        }
                    </select>
                </>
                : null
            }
            <div className="flex">
                <TextInput name="facebook" label="Facebook" onChange={setFacebook} value={facebook} disabled={socialLinksId !== null}/>
                <TextInput name="instagram" label="Instagram" onChange={setInstagram} value={instagram} disabled={socialLinksId !== null}/>
            </div>
            <div className="flex">
                <TextInput name="tiktok" label="TikTok" onChange={setTiktok} value={tiktok} disabled={socialLinksId !== null}/>
                <TextInput name="twitch" label="Twitch" onChange={setTwitch} value={twitch} disabled={socialLinksId !== null}/>
            </div>
            <div className="flex">
                <TextInput name="twitter" label="Twitter" onChange={setTwitter} value={twitter} disabled={socialLinksId !== null}/>
                <TextInput name="youtube" label="YouTube" onChange={setYoutube} value={youtube} disabled={socialLinksId !== null}/>
            </div>
            <TextInput name="website" label="Website" onChange={setWebsite} value={website} disabled={socialLinksId !== null}/>


        </>
    )
}