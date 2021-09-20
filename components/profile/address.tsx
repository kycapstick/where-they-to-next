import DynamicIcon from '../icons/DynamicIcon';
import Link from "next/link";

export default function Address({ entry }) {
    return (
        <div>
            <div className="flex">
                <div className="paragraph mr-5" style={{ color: entry.accent_color }}>
                    <DynamicIcon 
                        type="location"
                    />
                </div>
                <div>
                    <p>
                        { entry.digital 
                        ? 
                            <Link href={entry.address} >
                                <a className="underline">{entry.address}</a>
                            </Link>

                        : 
                            <span className="block">{entry.address}</span>
                            
                        }
                        {
                            (entry.city || entry.province) && !entry.digital && 
                            <span className="block">{entry.city ? `${entry.city}` : ''}{entry.city && entry.province && ', '}{entry.province ? entry.province : ''}</span>
                        }
                    </p>
                </div>
            </div>
            {
                ((entry.accessibility && entry.accessibility.length > 0) || entry.accessibility_description) &&
                <div className="flex mt-6">
                    <div className="paragraph mr-5" style={{ color: entry.accent_color }}>
                        <DynamicIcon 
                            type="accessibility"
                        />
                    </div>
                    {
                        entry.accessibility && entry.accessibility.length > 0 &&
                        <ul>
                            { 
                                entry.accessibility.map((feature) => {
                                    return (
                                        <li className="nth-child-2:mt-1 block" key={`accessibility-${feature.id}`}>{feature.name}</li>
                                    )
                                })
                            }
                        </ul>
                    }
                    {
                        entry.accessibility_description &&
                        <p>{entry.accessibility_description}</p>
                    }
                </div>
            }
        </div>
    )
}