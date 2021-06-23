import Link from "next/link";
import DynamicIcon from "../icons/DynamicIcon";

export default function EditButton({ href, accentColor = '#000000' }) {
    return (
        <Link
            href={href}
        >
            <a className="flex items-center py-4 group h1 ml-8" style={{ color: accentColor }}>
                <DynamicIcon 
                    type="edit"
                />
            </a>
        </Link>
    )
}