import '../styles/index.css'
import Footer from '@/components/footer'
import Head from '@/components/Head';
import { Provider } from 'next-auth/client'

function MyApp({ Component, pageProps }) {
    return (
        <Provider session={pageProps.session}>
            <Head />
            <Component {...pageProps} />
            <Footer />
        </Provider>
    )
}

export default MyApp
