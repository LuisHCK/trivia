import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useHistory } from 'react-router'
import {
    CREATE_ACCOUNT,
    LOGIN,
    SAVE_TOKEN,
} from '../../providers/auth.provider'
import LoginForm from './login-form'
import SignUpForm from './sign-up-form'

const AuthPopup = ({ isOpen }) => {
    const [selectedForm, setSelectedForm] = useState('login')
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

    const handleLogin = async (formData) => {
        setIsLoading(true)

        try {
            const { data } = await LOGIN(formData)
            await SAVE_TOKEN(data?.token)

            history.push('/admin')
        } catch (error) {
            console.error(error)
            setIsLoading(false)
        }
    }

    const handleSignUp = async (formData) => {
        setIsLoading(true)

        try {
            const { data } = await CREATE_ACCOUNT(formData)
            await SAVE_TOKEN(data?.token)

            history.push('/admin')
        } catch (error) {
            console.error(error)
            setIsLoading(false)
        }
    }

    return (
        <Modal centered show={isOpen}>
            <Modal.Header className="text-center">
                <Modal.Title>Iniciar Sesión</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedForm === 'login' && (
                    <>
                        <LoginForm onSubmit={handleLogin} loading={isLoading} />
                        <br />
                        <div className="text-center">
                            <span>¿No tienes una cuenta?</span>{' '}
                            <Button
                                variant="link"
                                onClick={() => setSelectedForm('registration')}
                            >
                                Registrarme
                            </Button>
                        </div>
                    </>
                )}

                {selectedForm === 'registration' && (
                    <>
                        <SignUpForm
                            onSubmit={handleSignUp}
                            loading={isLoading}
                        />
                        <br />
                        <div className="text-center">
                            <span>¿Ya tienes una cuenta?</span>{' '}
                            <Button
                                variant="link"
                                onClick={() => setSelectedForm('login')}
                            >
                                Iniciar sesión
                            </Button>
                        </div>
                    </>
                )}
            </Modal.Body>
        </Modal>
    )
}

export default AuthPopup
