import Link from 'next/link'
import ButtonLink from "@/components/button-link";


export default function dashboardList(props) {
    const { entries, isLoading, title = 'profile', route = "artists" } = props;
    return (
        <div>
            <h2>{`${route.toUpperCase()}`}</h2>
            <ul>
                {
                    isLoading 
                        ? 
                            <li>Loading</li> 
                        :
                        entries.map((entry) => {
                            return (
                                <li>
                                    <Link href={`/${route}/profile/${entry.slug}`}>
                                        {entry.name}
                                    </Link>
                                </li>
                            )
                        })
                }   
            </ul>
            <ButtonLink 
                href={`/${route}/create`}
                children={`Create new ${title}`}
            />
        </div>
    )
}