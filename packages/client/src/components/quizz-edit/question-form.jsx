import React from 'react'
import { Button, Card, Col, Form } from 'react-bootstrap'
import { BsTrash } from 'react-icons/bs'
import {
    UPDATE_QUESTION,
    REMOVE_QUESTION,
    useQuestionForm,
    SET_ACTIVE_ITEM,
} from '../../context/question-form-context'

let debouncer

const QuestionForm = ({ position, question }) => {
    const { state, dispatch } = useQuestionForm()

    const handleInputChange = ({ target: { name, value } }) => {
        clearTimeout(debouncer)

        debouncer = setTimeout(() => {
            dispatch({
                type: UPDATE_QUESTION,
                payload: {
                    question: {
                        ...question,
                        [name]: value,
                    },
                    index: position - 1,
                },
            })
        }, 300)
    }

    const deleteQuestion = () => {
        // Update current Question carousel
        dispatch({
            type: SET_ACTIVE_ITEM,
            payload: state.questions?.length - 2,
        })

        setTimeout(() => {
            dispatch({
                type: REMOVE_QUESTION,
                payload: { question, index: position - 1 },
            })
        }, 500)
    }

    return (
        <Card border="primary">
            <Card.Header>
                <Form.Row>
                    <Form.Group as={Col} controlId="question-1">
                        <Form.Label>Pregunta #{position}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Escribe aquí la pregunta"
                            name="title"
                            onChange={handleInputChange}
                            defaultValue={question.title}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Este campo es requerido
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
            </Card.Header>

            <Card.Body>
                <Form.Row>
                    <Form.Group as={Col} md={6} sm={12} controlId="response-1">
                        <Form.Label>Respuesta #1</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Escribe aqui la respuesta"
                            name="response1"
                            onChange={handleInputChange}
                            defaultValue={question.response1}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Este campo es requerido
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md={6} sm={12} controlId="response-2">
                        <Form.Label>Respuesta #2</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Escribe aqui la respuesta"
                            name="response2"
                            onChange={handleInputChange}
                            defaultValue={question.response2}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Este campo es requerido
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md={6} sm={12} controlId="response-3">
                        <Form.Label>Respuesta #3</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Escribe aqui la respuesta"
                            name="response3"
                            onChange={handleInputChange}
                            defaultValue={question.response3}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Este campo es requerido
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md={6} sm={12} controlId="response-4">
                        <Form.Label>Respuesta #4</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Escribe aqui la respuesta"
                            name="response4"
                            onChange={handleInputChange}
                            defaultValue={question.response4}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Este campo es requerido
                        </Form.Control.Feedback>
                    </Form.Group>

                    {state.questions?.length > 1 && (
                        <Col xs={12}>
                            <div className="d-flex justify-content-center mt-2">
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={deleteQuestion}
                                >
                                    Eliminar pregunta
                                    <BsTrash />
                                </Button>
                            </div>
                        </Col>
                    )}
                </Form.Row>
            </Card.Body>
        </Card>
    )
}

export default QuestionForm
