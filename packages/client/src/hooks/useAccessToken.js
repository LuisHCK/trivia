import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'

/**
 * Returns acess token
 * @returns {string} Access token
 */
const useAccessToken = () => {
    const [accessToken, setAccessToken] = useState()
    const { getAccessTokenSilently } = useAuth0()

    useEffect(() => {
        const getToken = async () => {
            const token = await getAccessTokenSilently({
                audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            })
            setAccessToken(token)
        }

        getToken()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken])

    return accessToken
}

export default useAccessToken
