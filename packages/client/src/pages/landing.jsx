import React, { Fragment, useEffect, useState } from 'react'
import { Button, FormControl, InputGroup, Modal } from 'react-bootstrap'
import { APP_TITLE } from '../providers/app.provider'
import { useAuth0 } from '@auth0/auth0-react'
import { useHistory } from 'react-router-dom'
import useQuery from '../hooks/useQuery'

const Landing = () => {
    const [showModal, setShowModal] = useState(false)
    const [roomKey, setRoomKey] = useState('')
    const { loginWithRedirect, isAuthenticated } = useAuth0()
    const history = useHistory()
    const queryParams = useQuery()

    const toggleModal = () => setShowModal((prev) => !prev)

    const handleClose = () => {
        setShowModal(false)
        setRoomKey('')
    }

    const validKey = () => roomKey.length === 6

    const handleEnter = () => {
        setShowModal(false)
        if (validKey()) {
            history.push(`/room/${roomKey}`)
        }
    }

    useEffect(() => {
        if (isAuthenticated && queryParams.noredirect !== 'true') {
            history.push('/admin')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, queryParams])

    return (
        <Fragment>
            <main className="home-container">
                <div className="content-wrapper">
                    <h1 className="display-2">{APP_TITLE}</h1>
                    <p>Juega, aprende y diviertete</p>

                    <div className="buttons-wrapper mt-4">
                        <div className="button-container">
                            <Button
                                variant="success"
                                onClick={toggleModal}
                                block
                            >
                                Jugar
                            </Button>
                        </div>
                        <div className="button-container">
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

            <Modal show={showModal} onHide={toggleModal} size="md" centered>
                <Modal.Header>Codigo de la sala</Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="room-key">@</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Clave de la sala"
                            aria-label="Clave de la sala"
                            aria-describedby="room-key"
                            value={roomKey}
                            onChange={({ target: { value } }) =>
                                setRoomKey(value?.toUpperCase())
                            }
                            maxLength={6}
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button
                        variant="success"
                        onClick={handleEnter}
                        disabled={!validKey()}
                    >
                        ¡Entrar!
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default Landing
