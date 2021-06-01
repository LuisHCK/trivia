import Cookies from 'js-cookie'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Redirect, Route } from 'react-router'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!Cookies.get('authorization')
    )

    useEffect(() => {
        setIsAuthenticated(!!Cookies.get('authorization'))
    }, [])

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
            }
        />
    )
}

export default PrivateRoute
