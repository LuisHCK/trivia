import { useLocation } from 'react-router-dom'

const useQuery = () => {
    const location = useLocation()
    let result = {}

    const searchParams = new URLSearchParams(location.search)

    for (const [key, value] of searchParams.entries()) {
        result[key] = value
    }

    return result
}

export default useQuery
