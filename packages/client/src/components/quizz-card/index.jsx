import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Badge, Button, Card, Col } from 'react-bootstrap'
import { BsPlayFill, BsPencilSquare, BsTrashFill } from 'react-icons/bs'
import { SET_FORM, useQuestionForm } from '../../context/question-form-context'

const QuizCard = ({ quiz, onClickEdit, onClickDelete }) => {
    const { dispatch } = useQuestionForm()

    const handleEdit = () => {
        dispatch({ type: SET_FORM, payload: quiz })
        onClickEdit()
    }

    const handleDelete = () => {
        if (
            window.confirm(
                `Estás seguro de borrar esta Trivia: ${quiz.title}?\n` +
                    `¡Esta acción no se puede deshacer!`
            )
        ) {
            onClickDelete(quiz)
        }
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
                    <Button
                        to={`/admin/trivia/${quiz._id}`}
                        as={Link}
                        variant="success"
                        className="mr-2"
                    >
                        Iniciar
                        <BsPlayFill />
                    </Button>
                    <Button
                        variant="light"
                        className="mr-2"
                        onClick={handleEdit}
                    >
                        <BsPencilSquare />
                    </Button>
                    <Button
                        variant="light"
                        className="text-danger"
                        onClick={handleDelete}
                    >
                        <BsTrashFill />
                    </Button>
                </Card.Footer>
            </Card>
        </Col>
    )
}

QuizCard.propTypes = {
    onClickEdit: PropTypes.func,
    onClickDelete: PropTypes.func,
    quiz: PropTypes.object,
}

QuizCard.defaultProps = {
    quiz: {},
}

export default QuizCard
