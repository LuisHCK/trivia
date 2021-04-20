import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Badge, Button, Card, Col } from 'react-bootstrap'
import { BsPlayFill, BsPencilSquare } from 'react-icons/bs'
import { SET_FORM, useQuestionForm } from '../../context/question-form-context'

const QuizCard = ({ quiz, onClickEdit }) => {
    const { dispatch } = useQuestionForm()

    const handleEdit = () => {
        dispatch({ type: SET_FORM, payload: quiz })
        onClickEdit()
    }

    return (
        <Col className="mb-4" xs="12" md="6" lg="4">
            <Card className="h-100" bg="light">
                <Card.Body>
                    <Card.Title>
                        <Badge variant="info">{quiz.category}</Badge>{' '}
                        {quiz.title}
                    </Card.Title>
                    <Card.Text>{quiz.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Link href={`/admin/quiz/${quiz._id}`} passHref>
                        <Button as="a" variant="success" className="mr-2">
                            Iniciar
                            <BsPlayFill />
                        </Button>
                    </Link>
                    <Button variant="light" onClick={handleEdit}>
                        Editar
                        <BsPencilSquare className="ml-1" />
                    </Button>
                </Card.Footer>
            </Card>
        </Col>
    )
}

QuizCard.propTypes = {
    onClickEdit: PropTypes.func,
    quiz: PropTypes.object,
}

QuizCard.defaultProps = {
    quiz: {},
}

export default QuizCard
