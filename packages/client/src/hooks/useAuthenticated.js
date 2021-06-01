import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

/**
 * Returns acess token
 * @returns {string} Access token
 */
const useAuthenticated = () => {
    const [accessToken, setAccessToken] = useState()

    useEffect(() => {
        const getToken = () => {
            const token = Cookies.get('authorization')
            setAccessToken(!!token)

            console.log(!!token)
        }

        getToken()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken])

    return accessToken
}

export default useAuthenticated
