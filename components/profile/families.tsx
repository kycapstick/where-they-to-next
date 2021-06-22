import DynamicIcon from "../icons/DynamicIcon";

import Link from 'next/link'

export default function Families({ families, accentColor }) {
    return (
        <>
            <div className="flex items-center">
                <div className="paragraph mr-2" style={{ color: accentColor }}>
                    <DynamicIcon type="family" />
                </div>
                <ul>
                    {
                        families.map((family, index) => (
                            <li key={`family-${index}`}>
                                <Link
                                    href={`/families/profile/${family.slug}`}
                                >
                                    <a className="underline p-2 block hover:no-underline">{family.name}</a>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}