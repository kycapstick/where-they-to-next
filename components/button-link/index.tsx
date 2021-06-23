import Link from 'next/link'
import cn from 'clsx'

function ButtonLink({ href = '/', className = '', accentColor = "#000", children, }) {
    return (
        <Link href={href}>
            <a
                className={cn(
                    'bg-black',
                    'text-white',
                    'p-2',
                    'rounded',
                    'uppercase',
                    'text-sm',
                    'font-bold',
                    {
                        [className]: Boolean(className),
                    }
                )}
                style={{
                    backgroundColor: accentColor
                }}
            >
                {children}
            </a>
        </Link>
    )
}

export default ButtonLink
