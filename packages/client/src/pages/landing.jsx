import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { APP_TITLE } from '../providers/app.provider'
import { useAuth0 } from '@auth0/auth0-react'

const Landing = () => {
    const { loginWithRedirect } = useAuth0()

    return (
        <main className="home-container">
            <div className="content-wrapper">
                <h1 className="display-2">{APP_TITLE}</h1>
                <p>Juega, aprende y diviertete</p>

                <div className="d-flex w-50 mt-4">
                    <div className="w-50 px-4">
                        <Link href="/trivia">
                            <Button variant="success" block>
                                Jugar
                            </Button>
                        </Link>
                    </div>
                    <div className="w-50 px-4">
                        <Button
                            onClick={() =>
                                loginWithRedirect({
                                    redirectUri: `${window.location.origin}/admin`,
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
