import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const InvalidRoom = () => {
    return (
        <Container>
            <div className="d-flex align-items-center justify-content-center flex-column">
                <h1>Codigo de sala inválido</h1>
                <Button as={Link} to="" size="lg">
                    Volver al inicio
                </Button>
            </div>
        </Container>
    )
}

export default InvalidRoom
