import React, { useState } from 'react'
import { Button, Card, Col, Form, Image, Spinner } from 'react-bootstrap'
import { BsTrash } from 'react-icons/bs'
import {
    UPDATE_QUESTION,
    REMOVE_QUESTION,
    useQuestionForm,
    SET_ACTIVE_ITEM,
} from '../../context/question-form-context'
import useAccessToken from '../../hooks/useAuthenticated'
import { UPLOAD_PHOTO } from '../../providers/room.admin.provider'
import getPhotoPath from '../../utils/getPhotoPath'

let debouncer

const QuestionForm = ({ position, question }) => {
    const { state, dispatch } = useQuestionForm()
    const accessToken = useAccessToken()
    const [uploadingPhoto, setUploadingPhoto] = useState(false)

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

    const handlePhoto = async (event) => {
        setUploadingPhoto(true)

        try {
            const formData = new FormData()
            formData.append('photo', event.target.files[0])
            const { data } = await UPLOAD_PHOTO(formData, accessToken)

            dispatch({
                type: UPDATE_QUESTION,
                payload: {
                    question: {
                        ...question,
                        photo: data,
                    },
                    index: position - 1,
                },
            })

            setUploadingPhoto(false)
        } catch (error) {
            console.error(error)
            setUploadingPhoto(false)
        }
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
                        <Form.Label>Respuesta correcta</Form.Label>
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

                    <Form.Group as={Col} md={12} sm={15}>
                        <Form.Label>Foto</Form.Label>

                        <div className="text-center mb-2 admin-photo-container">
                            {!uploadingPhoto && question.photo && (
                                <Image
                                    src={getPhotoPath(question.photo?.path)}
                                    thumbnail
                                />
                            )}

                            {uploadingPhoto && (
                                <>
                                    <Spinner
                                        animation="border"
                                        variant="info"
                                    />
                                    <div>
                                        <span>Subiendo foto...</span>
                                    </div>
                                </>
                            )}
                        </div>

                        <Form.File
                            id={`position-${position}-photo`}
                            label="Selecciona una foto"
                            onChange={handlePhoto}
                            data-browse="Seleccionar"
                            custom
                        />
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
