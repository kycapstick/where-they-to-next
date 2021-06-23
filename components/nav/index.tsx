import Link from 'next/link'
import Container from '@/components/container'
import ButtonLink from '@/components/button-link'
import { signIn, signOut, useSession } from 'next-auth/client'

export default function Nav({ title = 'Where They To' }) {
    const [ session, loading ] = useSession();

    return (
        <Container className="py-4">
            <nav>
                <div className="flex justify-between items-center">
                    <Link href="/">
                        <a className="font-bold text-3xl">{title}</a>
                    </Link>
                    {!session && <>
                        <button onClick={() => signIn()}>Sign in</button>
                    </>}
                    {session && <>
                        <button onClick={() => signOut()}>Sign out</button>
                        </>
                    }
                </div>
            </nav>
        </Container>
    )
}
