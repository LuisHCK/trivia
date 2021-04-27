import { Helmet } from 'react-helmet'
import { APP_TITLE } from './providers/app.provider'
import AppRouter from './router'

const App = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{APP_TITLE}</title>
            </Helmet>
            <AppRouter />
        </>
    )
}

export default App
