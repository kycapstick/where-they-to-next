import { useEffect, useState, useCallback } from 'react';
import TextInput from '../text-input';

export default function SocialLinks({ facebook, setFacebook, instagram, setInstagram, twitch, setTwitch, twitter, setTwitter, website, setWebsite, youtube, setYoutube, socialLinksId, setSocialLinksId }) {
    const [ socialLinks, setSocialLinks ] = useState([])
    const [ loading, setLoading ] = useState(false);
    const [ existingOptions, setExistingOptions ] = useState(false);
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
    }
    useEffect(() => {
        fetchSocialLinks()
    }, [fetchSocialLinks])
    return (
        <>
            <h2 className="h3 mt-10 text-center">Social Links</h2>
            {
                socialLinks.length ?
                <>
                    <p className="paragraph text-center">You can either add new social links below or use an existing set of social media links:</p>
                    {
                        existingOptions ?
                        <>
                            <label htmlFor="existing-socials" className="block label mt-6">Existing Socials</label>
                            <div className="w-full mx-auto border mt-4">
                                <select className="block w-full p-4" name="existing-socials" id="existing-socials" onChange={handleSocialLinks} disabled={loading} value={socialLinksId ? socialLinksId : ''}>
                                    <option value="">Create New</option>
                                    {
                                        socialLinks.map((socialLink, index) => {
                                            return (
                                                <option value={socialLink.id} key={`social-links-${index}`}>{socialLink.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <a className="block mt-2 underline" href="#" onClick={(e)=> { e.preventDefault(); setSocialLinksId(null)}}>Create new Socials</a>
                        </>
                        :
                        <a className="underline paragraph text-center mt-4 block" href="#" onClick={(e)=> { e.preventDefault(); setExistingOptions(true)}}>Add existing socials</a>
                    }
                    
                </>
                : null
            }
            <div className="md:flex">
                <div className="flex-half">                
                    <TextInput name="facebook" label="Facebook" onChange={setFacebook} value={facebook} disabled={socialLinksId !== null}/>
                </div>
                <div className="flex-half md:ml-6">                
                    <TextInput name="instagram" label="Instagram" onChange={setInstagram} value={instagram} disabled={socialLinksId !== null}/>
                </div>
            </div>
            <div className="md:flex">
                <div className="flex-half">
                    <TextInput name="twitter" label="Twitter" onChange={setTwitter} value={twitter} disabled={socialLinksId !== null}/>
                </div>
                <div className="flex-half md:ml-6">
                    <TextInput name="twitch" label="Twitch" onChange={setTwitch} value={twitch} disabled={socialLinksId !== null}/>
                </div>
            </div>
            <div className="md:flex">
                <div className="flex-half">
                    <TextInput name="youtube" label="YouTube" onChange={setYoutube} value={youtube} disabled={socialLinksId !== null}/>
                </div>
                <div className="flex-half md:ml-6">
                    <TextInput name="website" label="Website" onChange={setWebsite} value={website} disabled={socialLinksId !== null}/>
                </div>
            </div>

        </>
    )
}