import DynamicIcon from "../icons/DynamicIcon"

export default function socialLinks({ socials, name, accentColor }) {
    console.log(socials);
    return (
        <div className="mt-8">
            <ul className="mt-4 flex" style={{color: accentColor}}>
                {
                    socials.facebook &&
                    <li>
                        <a href={`www.facebook.com/${socials.facebook}`} className="paragraph">
                            <DynamicIcon 
                                type="facebook"
                                large={true}
                            />
                        </a>
                    </li>
                }
                {
                    // socials.instagram &&
                    <li>
                        <a href={`https://www.instagram.com/${socials.instagram}`} className="paragraph">
                            <DynamicIcon 
                                type="instagram"
                                large={true}

                            />
                        </a>
                    </li>
                }
                {
                    // socials.twitter &&
                    <li>
                        <a href={`https://www.twitter.com/${socials.twitter}`} className="paragraph">
                            <DynamicIcon 
                                type="twitter"
                                large={true}

                            />
                        </a>
                    </li>
                }
                {
                    // socials.twitch &&
                    <li>
                        <a href={`https://www.twitch.com/${socials.twitch}`} className="paragraph">
                            <DynamicIcon 
                                type="twitch"
                                large={true}

                            />
                        </a>
                    </li>
                }
                {
                    // socials.youtube &&
                    <li>
                        <a href={`https://www.youtube.com/${socials.youtube}`} className="paragraph">
                            <DynamicIcon 
                                type="youtube"
                                large={true}
                            />
                        </a>
                    </li>
                }
                {
                    // socials.website &&
                    <li>
                        <a href={`${socials.website}`} className="paragraph">
                            <DynamicIcon 
                                type="website"
                                large={true}
                            />
                        </a>
                    </li>
                }
            </ul>
        </div>
    )
}