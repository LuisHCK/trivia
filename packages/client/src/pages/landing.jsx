import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { APP_TITLE } from '../providers/app.provider'
import { useAuth0 } from '@auth0/auth0-react'
import { useHistory } from 'react-router-dom'

const Landing = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0()
    const history = useHistory()

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/admin')
        }
    }, [isAuthenticated])

    return (
        <main className="home-container">
            <div className="content-wrapper">
                <h1 className="display-2">{APP_TITLE}</h1>
                <p>Juega, aprende y diviertete</p>

                <div className="d-flex w-50 mt-4">
                    <div className="w-50 px-4">
                        <Link to="/trivia">
                            <Button variant="success" block>
                                Jugar
                            </Button>
                        </Link>
                    </div>
                    <div className="w-50 px-4">
                        <Button
                            onClick={() =>
                                loginWithRedirect({
                                    redirectUri: window.location.origin,
                                })
                            }
                            block
                        >
                            Crear una Trivia
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Landing
