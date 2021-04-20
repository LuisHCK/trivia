import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { BsPlus } from 'react-icons/bs'
import { Button, Col, Form, Modal } from 'react-bootstrap'
import QuestionsCarousel from './questions-carousel'
import {
    ADD_QUESTION,
    CLEAR_FORM,
    SET_FIELD,
    useQuestionForm,
} from '../../context/question-form-context'

let debouncer

const QuizEdit = ({ isOpen, onClose, onSubmit }) => {
    const [modalIsOpen, setModalIsOpen] = useState(isOpen)
    const [validated, setValidated] = useState(false)

    const { state, dispatch } = useQuestionForm()

    const addQuestion = () => {
        dispatch({ type: ADD_QUESTION })
    }

    const handleInputChange = ({ target: { value, name } }) => {
        clearTimeout(debouncer)

        debouncer = setTimeout(() => {
            dispatch({ type: SET_FIELD, payload: { name, value } })
        }, 300)
    }

    const closeForm = () => {
        // eslint-disable-next-line
        if (confirm('¡Al cerrar se perderán los cambios!')) {
            onClose()
            dispatch({ type: CLEAR_FORM })
            setValidated(false)
        }
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget
        event.preventDefault()
        event.stopPropagation()
        setValidated(true)

        if (form.checkValidity()) {
            onSubmit({ ...state })
            // Clean form
            dispatch({ type: CLEAR_FORM })
        }
    }

    useEffect(() => {
        setModalIsOpen(isOpen)
    }, [isOpen])

    return (
        <Modal show={modalIsOpen} onHide={closeForm} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    Trivia: {state.title ? `"${state.title}"` : ''}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} sm={12} md={6} controlId="tile">
                            <Form.Label>Título*</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Título de la Trivia"
                                defaultValue={state.title}
                                name="title"
                                onChange={handleInputChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Este campo es requerido
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group
                            as={Col}
                            sm={12}
                            md={6}
                            controlId="category"
                        >
                            <Form.Label>Categoría*</Form.Label>
                            <Form.Control
                                as="select"
                                defaultValue={state.category}
                                name="category"
                                onChange={handleInputChange}
                                required
                            >
                                <option value="" disabled>
                                    -Selecciona una opción-
                                </option>
                                {CATEGORIES.map((category) => (
                                    <option
                                        key={`opt-${category}`}
                                        value={category}
                                    >
                                        {category}
                                    </option>
                                ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Este campo es requerido
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} sm={12} md={6} controlId="timeout">
                            <Form.Label>Tiempo para contestar*</Form.Label>
                            <Form.Control
                                as="select"
                                defaultValue={state.timeout}
                                name="timeout"
                                onSelect={handleInputChange}
                                required
                            >
                                {TIMEOUTS.map((time) => (
                                    <option
                                        key={`opt-time-${time}`}
                                        value={time}
                                    >
                                        {time} segundos
                                    </option>
                                ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Este campo es requerido
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="description">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Describe sobre que trata la trivia"
                                defaultValue={state.description}
                                name="description"
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Control.Feedback type="invalid">
                            Este campo es requerido
                        </Form.Control.Feedback>
                    </Form.Row>

                    <Form.Row>
                        <Col>
                            <div className="d-flex justify-content-between pb-2">
                                <h5>Preguntas</h5>

                                <Button onClick={addQuestion} size="sm">
                                    Agregar pregunta
                                    <BsPlus />
                                </Button>
                            </div>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col>
                            <QuestionsCarousel />
                        </Col>
                    </Form.Row>

                    <Modal.Footer>
                        <Button
                            variant="light"
                            onClick={closeForm}
                            type="button"
                        >
                            Cancelar
                        </Button>
                        <Button variant="success" type="submit">
                            Guardar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

QuizEdit.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
}

export default QuizEdit

const CATEGORIES = [
    'Ciencia',
    'Historia',
    'Matemática',
    'Lengua y Literatura',
    'Ciencias Sociales',
    'Educación física',
]

const TIMEOUTS = [10, 15, 20, 25, 30]
