import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Form, Spinner } from 'react-bootstrap'
import { RiPencilFill } from 'react-icons/ri'
import { useHistory, useParams } from 'react-router'
import illustration from '../../assets/images/illustration.svg'
import UserCard from '../../components/user-card'
import { socketEvents } from '../../constants'
import { roomContextActions } from '../../constants/context-actions'
import { useRoomContext } from '../../context/room.context'
import { JOIN_ROOM } from '../../providers/room.public.provider'
import { loginToRoom, socket, subscribeToRoom, leaveRoom } from '../../socket'
import genId from '../../utils/gen-id'
import { getRandomColor } from '../../utils/random-color'

const ParticipantForm = () => {
    const [name, setName] = useState('')
    const { dispatch } = useRoomContext()

    /**
     * Handle form submit
     * @param {React.SyntheticEvent} event
     */
    const handleSubmit = (event) => {
        event.stopPropagation()
        event.preventDefault()

        if (name) {
            const participant = {
                name,
                id: genId(),
                color: getRandomColor(),
            }
            dispatch({
                type: roomContextActions.SET_PARTICIPANT,
                payload: participant,
            })
        }
    }

    return (
        <Card text="dark">
            <Card.Header>Introduce tu nombre</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit} inline>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                            type="text"
                            placeholder="Nombre y apellido"
                            name="name"
                            value={name}
                            onChange={({ target: { value } }) => setName(value)}
                            required
                            minLength="3"
                        />
                    </Form.Group>

                    <Button type="submit" disabled={!name.length}>
                        Guardar
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

const Welcome = () => {
    const { state, dispatch } = useRoomContext()
    const { id } = useParams()
    const history = useHistory()
    const socketClient = socket

    const onChangeName = () => {
        leaveRoom(id, { ...state.participant })
        dispatch({ type: roomContextActions.SET_PARTICIPANT, payload: null })
    }

    const getTrivia = async () => {
        const { data } = await JOIN_ROOM(id)

        if (!data) {
            return dispatch({
                type: roomContextActions.SET_INVALID_ROOM,
                payload: true,
            })
        }

        dispatch({ type: roomContextActions.SET_ROOM, payload: data?.room })
        dispatch({
            type: roomContextActions.SET_TRIVIA,
            payload: data?.trivia,
        })
    }

    useEffect(() => {
        getTrivia()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (state.invalidRoom) {
            history.push('/invalid-room')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.invalidRoom])

    useEffect(() => {
        if (state.started) {
            history.push(`/room/${id}/questions/0`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.started])

    useEffect(() => {
        if (socketClient && state.participant?.id) {
            loginToRoom(id, state.participant)

            subscribeToRoom((err, data) => {
                if (!err) {
                    dispatch({
                        type: roomContextActions.SET_ROOM,
                        payload: data,
                    })
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socketClient, state.participant])

    useEffect(() => {
        if (socketClient) {
            socketClient.on(socketEvents.START_TRIVIA, () => {
                dispatch({ type: roomContextActions.SET_TRIVIA_STARTED })
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socketClient])

    return (
        <Container>
            <div className="welcome-page">
                <h1 className="page-title">¿Estás listo para participar?</h1>

                <img
                    className="illustration"
                    src={illustration}
                    alt="trivia illustration"
                />

                <p className="trivia-title">{state.trivia?.title}</p>

                <ul className="trivia-details">
                    <li>Categoría: {state.trivia?.category}</li>
                    <li>{state.trivia?.questions?.length} preguntas</li>
                </ul>

                <div>
                    {!!state.participant ? (
                        <UserCard user={state.participant} hideScore>
                            <Button variant="link" onClick={onChangeName}>
                                <RiPencilFill />
                            </Button>
                        </UserCard>
                    ) : (
                        <ParticipantForm />
                    )}
                </div>

                {state.participant && (
                    <div className="waiting-button">
                        <Button
                            variant="primary"
                            size="lg"
                            className="d-flex align-items-center justify-content-center"
                            block
                            disabled={!state.started}
                        >
                            {state.room?.started
                                ? 'LISTO PARA PARTICIPAR'
                                : 'EN ESPERA'}

                            {!state.started && (
                                <Spinner
                                    as="span"
                                    className="ml-2"
                                    animation="border"
                                    size="sm"
                                />
                            )}
                        </Button>
                    </div>
                )}
            </div>
        </Container>
    )
}

export default Welcome
