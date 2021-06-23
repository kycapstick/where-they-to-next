import DynamicIcon from "../icons/DynamicIcon";

import Link from 'next/link'

export default function Families({ families, accentColor }) {
    return (
        <>
            <div className="flex">
                <div className="mt-2 paragraph mr-5" style={{ color: accentColor }}>
                    <DynamicIcon type="family" large={true} />
                </div>
                <ul>
                    {
                        families.map((family, index) => (
                            <li key={`family-${index}`}>
                                <Link
                                    href={`/families/profile/${family.slug}`}
                                >
                                    <a className="p-2 block paragraph">{family.name}</a>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}