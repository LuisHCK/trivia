import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'

const SignUpForm = ({ onSubmit, loading }) => {
    const [formData, setFormData] = useState({})
    const [showPassword, setShowPassword] = useState(false)

    const handleInput = ({ target: { name, value } }) => {
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onSubmit(formData)
    }

    const togglePassword = () => setShowPassword((prev) => !prev)

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control
                    name="username"
                    placeholder="Se usa para iniciar sesión"
                    onChange={handleInput}
                    required
                />
            </Form.Group>

            <Form.Group controlId="username">
                <Form.Label>Nombre completo</Form.Label>
                <Form.Control
                    name="name"
                    placeholder="Tu nombre"
                    onChange={handleInput}
                    required
                />
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Contraseña</Form.Label>

                <InputGroup className="mb-2">
                    <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        name="password"
                        onChange={handleInput}
                        required
                    />
                    <InputGroup.Append>
                        <Button variant="secondary" onClick={togglePassword}>
                            {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form.Group>

            <Button block variant="primary" type="submit" disabled={loading}>
                {loading ? (
                    <Spinner animation="border" variant="warning" size="sm" />
                ) : (
                    'CREAR CUENTA'
                )}
            </Button>
        </Form>
    )
}

SignUpForm.propTypes = {
    onSubmit: PropTypes.func,
    loading: PropTypes.bool,
}

export default SignUpForm
