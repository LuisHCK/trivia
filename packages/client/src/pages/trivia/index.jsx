import React, { Fragment, useEffect, useState } from 'react'
import {
    Badge,
    Button,
    Card,
    Col,
    Container,
    Row,
    Spinner,
} from 'react-bootstrap'
import AdminNavbar from '../../components/admin-navbar'
import UserCard from '../../components/user-card'
import QuizProgressCard from '../../components/quiz-progress-card'
import { BsPlayFill } from 'react-icons/bs'
import { useHistory, useParams } from 'react-router-dom'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import Loading from '../../components/loading'
import AnimatedSpinner from '../../components/spinner'
import useAccessToken from '../../hooks/useAccessToken'
import { GET_TRIVIA_BY_ID } from '../../providers/trivia.admin.provider'
import { CREATE_ROOM } from '../../providers/room.admin.provider'
import './index.scss'
import { adminLoginToRoom, socket, startTrivia } from '../../socket'
import { socketEvents } from '../../constants'
import ResultsTable from '../../components/results-table'

const Trivia = () => {
    const { id } = useParams()
    const [trivia, setTrivia] = useState()
    const [room, setRoom] = useState()
    const [participants, setParticipants] = useState([])
    const accessToken = useAccessToken()
    const [loggedIn, setloggedIn] = useState(false)
    const [started, setStarted] = useState(false)
    const [allFinished, setAllFinished] = useState(false)
    const history = useHistory()
    const socketClient = socket

    const getTrivia = async () => {
        const { data } = await GET_TRIVIA_BY_ID(id, accessToken)
        setTrivia(data)
    }

    const createRoom = async () => {
        const { data } = await CREATE_ROOM({ triviaId: id }, accessToken)
        setRoom(data)
    }

    const handleStartTrivia = async () => {
        startTrivia(room.key)
        setStarted(true)
    }

    /**
     * @returns {Array<Objects>}
     */
    const getParticipants = () => {
        return participants
            ?.sort(
                (prev, next) => parseFloat(prev.score) - parseFloat(next.score)
            )
            .reverse()
    }

    const returnToAdmin = () => {
        history.replace('/admin')
    }

    useEffect(() => {
        if (accessToken) {
            getTrivia()
            createRoom()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken])

    useEffect(() => {
        if (socketClient && room?._id && !loggedIn) {
            adminLoginToRoom(room.key)

            socketClient.on(socketEvents.LOGIN, (data) => {
                setParticipants(data)
            })

            socketClient.on(socketEvents.ROOM_UPDATE, (data) => {
                setParticipants(data)
            })

            socketClient.on(socketEvents.RECONNECT, (e) => {
                console.log('CONNECTED!!!')
            })

            setloggedIn(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socketClient, room])

    // When all participants finish display the results
    useEffect(() => {
        const finished =
            !!participants.length &&
            participants.every((p) => p.finished === true)

        if (finished) {
            setAllFinished(true)
        }

        if (!participants.length && started) {
            setStarted(false)
            setAllFinished(false)
        }
    }, [participants, started])

    const startButton = (
        <Button
            disabled={!participants?.length || started}
            onClick={handleStartTrivia}
            variant="success"
        >
            {started ? 'Esperando resultados... ' : 'Iniciar'}
            {started ? (
                <Spinner animation="border" size="sm" />
            ) : (
                <BsPlayFill />
            )}
        </Button>
    )

    return (
        <Fragment>
            <AdminNavbar />
            <main className="trivia-page py-4">
                <Container>
                    <div className="header">
                        <h1 className="h2">
                            {trivia?.title}{' '}
                            <Badge variant="info">
                                {room?.key?.toUpperCase() || 'Cargando...'}
                            </Badge>
                        </h1>
                        <div className="trivia-start-button">{startButton}</div>
                    </div>

                    <Row>
                        <Col
                            xs={{ cols: 12, order: 2 }}
                            md={{ cols: 12, order: 2 }}
                            lg={{ cols: 7, order: 1 }}
                        >
                            <Card>
                                <Card.Header>
                                    <Card.Title>Preguntas</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <div className="participants">
                                        {trivia?.questions.map(
                                            (question, index) => (
                                                <QuizProgressCard
                                                    question={question}
                                                    key={`quiz-question-${index}`}
                                                    index={index}
                                                />
                                            )
                                        )}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col
                            md={{ cols: 12, order: 2 }}
                            lg={{ cols: 5, order: 2 }}
                        >
                            <Card className="mb-4">
                                <Card.Header>
                                    <Card.Title>Participantes</Card.Title>
                                </Card.Header>

                                <Card.Body>
                                    <div className="participants">
                                        {getParticipants()?.map(
                                            (user, index) => (
                                                <UserCard
                                                    key={'user-card-' + index}
                                                    user={user}
                                                    position={index}
                                                    score={user.score || 0}
                                                />
                                            )
                                        )}

                                        {!participants?.length && (
                                            <Card border="danger">
                                                <Card.Body>
                                                    <div className="d-flex justify-content-center align-items-center">
                                                        <span className="mr-2">
                                                            Esperando
                                                            participantes
                                                        </span>
                                                        <AnimatedSpinner />
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        )}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </main>

            <ResultsTable
                isOpen={allFinished}
                participants={getParticipants()}
                onFinish={returnToAdmin}
            />
        </Fragment>
    )
}

export default withAuthenticationRequired(Trivia, {
    onRedirecting: () => <Loading />,
})
