import Link from "next/link";
import DynamicIcon from "../icons/DynamicIcon";

export default function EditButton({ href, accentColor = '#000000' }) {
    return (
        <Link
            href={href}
        >
            <a className="flex items-center p-4 group paragraph" style={{ color: accentColor }}>
                <DynamicIcon 
                    type="edit"
                />
                <span className="block w-full ml-2 ">
                    edit profile
                </span>
            </a>
        </Link>
    )
}