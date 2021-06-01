import React from 'react'
import { Button, Nav, Navbar } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { APP_TITLE } from '../../providers/app.provider'
import { REMOVE_TOKEN } from '../../providers/auth.provider'

const AdminNavbar = () => {
    const history = useHistory()

    const handleLogout = () => {
        REMOVE_TOKEN()
        history.push('/')
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand as={Link} to="/?noredirect=true">
                {APP_TITLE}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse>
                <Nav className="mr-auto"></Nav>
                <Nav>
                    <Nav.Link as={Button} variant="link" onClick={handleLogout}>
                        Salir
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default AdminNavbar
