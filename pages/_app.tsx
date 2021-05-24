import '../styles/index.css'
import Footer from '@/components/footer'
import { Provider } from 'next-auth/client'

function MyApp({ Component, pageProps }) {
    return (
        <Provider session={pageProps.session}>
            <Component {...pageProps} />
            <Footer />
        </Provider>
    )
}

export default MyApp
