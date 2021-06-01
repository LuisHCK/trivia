import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Spinner } from 'react-bootstrap'

const LoginForm = ({ onSubmit, loading }) => {
    const [formData, setFormData] = useState({})

    const handleInput = ({ target: { name, value } }) => {
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onSubmit(formData)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control
                    name="username"
                    placeholder="Nombre de usuario o email"
                    onChange={handleInput}
                    required
                />
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleInput}
                    required
                />
            </Form.Group>

            <Button block variant="primary" type="submit" disabled={loading}>
                {loading ? (
                    <Spinner animation="border" variant="warning" size="sm" />
                ) : (
                    'INICIAR SESIÓN'
                )}
            </Button>
        </Form>
    )
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
    loading: PropTypes.bool,
}

export default LoginForm
