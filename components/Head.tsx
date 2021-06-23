import Head from 'next/head'

export default function SiteHead({ title = 'where they to'}) { 
    return (
        <Head>
            <title>{title}</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
            <link href="https://fonts.googleapis.com/css2?family=Lora:wght@700&family=Roboto:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
        </Head>
    )

}