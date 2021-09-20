import ProfileTitle from './title';
import { useSession } from 'next-auth/client'
import Image from 'next/image';

import Artists from './artists';
import Families from './families';
import Address from './address';

import FollowButton from '@/components/follow-button';
import SocialLinks from './socialLinks';
import Headshot from '../Placeholder/Headshot';

export default function Profile({ entry, route = 'artists' }) {
    const [ session, loading ] = useSession();
    const owner = entry.user_id && session && session.id && Number(entry.user_id) === Number(session.id)
    const { social_links } = entry;
    const activeSocials = social_links && (social_links.facebook !== ''  || social_links.instagram !== '' || social_links.twitch !== '' || social_links.twitter !== '' || social_links.website !== '' || social_links.youtube !== '');
    return ( 
            <div className="flex mt-8">      
                <div className={`w-1/2 relative` }>
                    <ProfileTitle 
                        title={entry.name}
                        owner={owner}
                        types={entry.artist_types}
                        slug={entry.slug}
                        accentColor={entry.accent_color}
                        route={route}
                        modal={entry.tips || entry.tips_link ? { type: 'tips', title: `Tip ${entry.name}`, description: entry.tips, link: entry.tips_link } : { type: null, title: null, description: null, link: null } }
                    />
                    {
                        session && session.id &&
                        <div className="mt-6">
                            <FollowButton 
                                route={route}
                                accentColor={entry.accent_color}
                                entry_id={entry.id}
                                user_id={session.id}
                            />
                        </div>
                    }
                    <div className={`mt-8`}>
                        {
                            entry.artists && entry.artists.length > 0 &&
                            <div className={`bg-grey-10 p-6 ${session && session.id ? 'mt-4' : ''}`}> 
                                <Artists artists={entry.artists} />
                            </div>
                        }
                        {
                            entry.families && entry.families.length > 0 &&
                            <div>
                                <div className={`bg-grey-10 px-8 py-6 ${session && session.id ? 'mt-4' : ''}`}>
                                    <Families families={entry.families} accentColor={entry.accent_color} />
                                </div>
                            </div>
                        }
                        {
                            entry.address &&
                            <div className={`bg-grey-10 p-6 ${session && session.id ? 'mt-4' : ''}`}> 
                                <Address 
                                    entry={ entry }
                                />
                            </div>
                        }
                        {
                            entry.bio &&                        
                            <div className="mt-8">
                                <h2 className="h4">Bio</h2>
                                <p className="paragraph mt-4">{entry.bio}</p>
                            </div>
                        }
                        {
                            entry.description &&                        
                            <div className="mt-8">
                                <h2 className="h4">About</h2>
                                <p className="paragraph mt-4">{entry.description}</p>
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
                    <div className="w-1/2 pl-12 flex justify-end">
                    {
                    entry.image && entry.image.url ?
                        <div>
                            <Image 
                                src={decodeURI(entry.image.url)}
                                height={739}
                                width={739}
                                objectFit="contain"
                            />
                        </div>
                        : 
                        <div className="bg-grey-10 pt-full flex w-full items-center relative">
                            <div className="absolute p-25 inset-0">
                                <Headshot large={true} />
                            </div>
                        </div>
                    }
                </div>

            </div>
    )
}
