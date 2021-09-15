import Link from 'next/link'
import Image from 'next/image';

export default function Artists({ artists }) {
    return (
        <ul className="flex">
            {
                artists.map((artist, index) => {
                    return (
                        <li key={`artist-${index}`} className="nth-child-2:ml-8 flex-half">
                            <Link href={`/artists/profile/${artist.slug}`}>
                                <a>
                                    <div className="flex items-center">
                                        <div className="bg-grey rounded-full relative" style={{ height: '60px', width: '60px', backgroundColor: `${artist.accent_color}`, border: `2px solid black` }}>
                                            {
                                                artist?.image_id && artist?.image?.url &&
                                                <Image 
                                                    className="rounded-full mx-auto block"
                                                    height={80}
                                                    width={80}
                                                    layout="fill"
                                                    src={artist.image.url}
                                                    objectFit="cover"
                                                />
                                        
                                            }
                                        </div>
                                        <p className="paragraph ml-4">{artist.name}</p>
                                    </div>
                                </a>
                            </Link>
                        </li>
                    )
                })
            }
        </ul>
    )
}