import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { APP_TITLE } from '../../providers/app.provider'
import { useAuth0 } from '@auth0/auth0-react'

const AdminNavbar = () => {
    const { logout } = useAuth0()

    const handleLogout = () => {
        logout({ returnTo: window.location.origin })
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
                    <Nav.Link as={Link} to="" onClick={handleLogout}>
                        Salir
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default AdminNavbar
