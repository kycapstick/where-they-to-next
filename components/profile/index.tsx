import ProfileTitle from './title';
import { useSession } from 'next-auth/client'
import Image from 'next/image';

import Families from './families';
import FollowButton from '@/components/follow-button';
import SocialLinks from './socialLinks';

export default function Profile({ entry }) {
    const [ session, loading ] = useSession();
    const owner = entry.user_id && session && session.id && Number(entry.user_id) === Number(session.id)
    const { social_links } = entry;
    const activeSocials = social_links && (social_links.facebook !== ''  || social_links.instagram !== '' || social_links.twitch !== '' || social_links.twitter !== '' || social_links.website !== '' || social_links.youtube !== '');
    return ( 
            <div className="flex mt-8">      
                <div className={` ${entry.image && entry.image.url ? 'w-1/2 mr-10' : ''} relative` }>
                    <ProfileTitle 
                        title={entry.name}
                        owner={owner}
                        types={entry.performer_types}
                        accentColor={entry.accent_color}
                        modal={entry.tips || entry.tips_link ? { type: 'tips', title: `Tip ${entry.name}`, description: entry.tips, link: entry.tips_link } : { type: null, title: null, description: null, link: null } }
                    />
                    {
                        session && session.id &&
                        <div className="mt-6">
                            <FollowButton 
                                route="performers"
                                accentColor={entry.accent_color}
                                entry_id={entry.id}
                                user_id={session.id}
                            />
                        </div>
                    }
                    <div className={`${session && session.id ? 'mt-8' : ''}`}>
                        {
                            entry.families && entry.families.length > 0 &&
                            <div>
                                <div className={`bg-grey-faint px-8 py-6 ${session && session.id ? 'mt-4' : ''}`}>
                                    <Families families={entry.families} accentColor={entry.accent_color} />
                                </div>
                            </div>
                        }
                        {
                            entry.bio &&                        
                            <div className="mt-6">
                                <h2 className="h4">About</h2>
                                <p className="paragraph mt-3">{entry.bio}</p>
                            </div>
                        }
                        { 
                            activeSocials &&
                            <SocialLinks 
                                socials={social_links}
                                name={entry.name}
                                accentColor={entry.accent_color}
                            />
                        }
                    </div>
                </div>
                {
                    entry.image && entry.image.url &&
                    <div className="w-1/2 flex justify-end">
                        <div>
                            <Image 
                                src={entry.image.url}
                                height={739}
                                width={739}
                                objectFit="cover"
                            />
                        </div>
                    </div>
                }
            </div>
    )
}
