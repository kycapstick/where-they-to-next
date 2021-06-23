import DynamicIcon from "../icons/DynamicIcon"

export default function socialLinks({ socials, name, accentColor }) {
    console.log(socials);
    return (
        <div className="mt-6">
            <ul className="flex" style={{color: accentColor}}>
                {
                    socials.facebook &&
                    <li className="nth-child-2:ml-3">
                        <a href={`www.facebook.com/${socials.facebook}`} className="paragraph">
                            <DynamicIcon 
                                type="facebook"
                                large={true}
                            />
                        </a>
                    </li>
                }
                {
                    socials.instagram &&
                    <li className="nth-child-2:ml-3">
                        <a href={`https://www.instagram.com/${socials.instagram}`} className="paragraph">
                            <DynamicIcon 
                                type="instagram"
                                large={true}

                            />
                        </a>
                    </li>
                }
                {
                    socials.twitter &&
                    <li className="nth-child-2:ml-3">
                        <a href={`https://www.twitter.com/${socials.twitter}`} className="paragraph">
                            <DynamicIcon 
                                type="twitter"
                                large={true}

                            />
                        </a>
                    </li>
                }
                {
                    socials.twitch &&
                    <li className="nth-child-2:ml-3">
                        <a href={`https://www.twitch.com/${socials.twitch}`} className="paragraph">
                            <DynamicIcon 
                                type="twitch"
                                large={true}

                            />
                        </a>
                    </li>
                }
                {
                    socials.youtube &&
                    <li className="nth-child-2:ml-3">
                        <a href={`https://www.youtube.com/${socials.youtube}`} className="paragraph">
                            <DynamicIcon 
                                type="youtube"
                                large={true}
                            />
                        </a>
                    </li>
                }
                {
                    socials.website &&
                    <li className="nth-child-2:ml-3">
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