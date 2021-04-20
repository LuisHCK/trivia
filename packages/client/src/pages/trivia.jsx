import React, { Fragment, useEffect, useState } from 'react'
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap'
import AdminNavbar from '../components/admin-navbar'
import UserCard from '../components/user-card'
import QuizProgressCard from '../components/quiz-progress-card'
import { BsPlayFill } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import Loading from '../components/loading'
import AnimatedSpinner from '../components/spinner'
import useAccessToken from '../hooks/useAccessToken'
import { GET_TRIVIA_BY_ID } from '../providers/trivia.admin.provider'

const Trivia = () => {
    const { id } = useParams()
    const [trivia, setTrivia] = useState()
    const [room, setRoom] = useState()
    const [users, setUsers] = useState([])
    const accessToken = useAccessToken()

    const getTrivia = async () => {
        const { data } = await GET_TRIVIA_BY_ID(id, accessToken)
        setTrivia(data)
    }

    useEffect(() => {
        if (accessToken) {
            getTrivia()
        }
    }, [accessToken])

    return (
        <Fragment>
            <AdminNavbar />
            <main>
                <Container>
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="mb-4 mt-2 h2">
                            {trivia?.title}

                            <Badge variant="info">room id</Badge>
                        </h1>
                        <Button disabled={room?.participants?.length}>
                            Iniciar
                            <BsPlayFill />
                        </Button>
                    </div>

                    <Row>
                        <Col xs={12} md={7}>
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
                        <Col xs={12} md={5}>
                            <Card>
                                <Card.Header>
                                    <Card.Title>Participantes</Card.Title>
                                </Card.Header>

                                <Card.Body>
                                    <div className="participants">
                                        {room?.participants?.map(
                                            (user, index) => (
                                                <UserCard
                                                    key={'user-card-' + index}
                                                    user={user}
                                                    position={index}
                                                    score={0}
                                                />
                                            )
                                        )}

                                        {!users.length && (
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
        </Fragment>
    )
}

export default withAuthenticationRequired(Trivia, {
    onRedirecting: () => <Loading />,
})
