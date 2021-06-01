import React from 'react'
import { Button, Nav, Navbar } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { APP_TITLE } from '../../providers/app.provider'
import Cookies from 'js-cookie'

const AdminNavbar = () => {
    const history = useHistory()

    const handleLogout = () => {
        Cookies.set('authorization', undefined)
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
