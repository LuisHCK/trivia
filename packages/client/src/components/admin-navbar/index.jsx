import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { APP_TITLE } from '../../providers/app.provider';

const AdminNavbar = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Link href="/admin">
                <Navbar.Brand href="#home">{APP_TITLE}</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse>
                <Nav className="mr-auto"></Nav>
                <Nav>
                    <Link href="/api/auth/logout">
                        <Nav.Link>Salir</Nav.Link>
                    </Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default AdminNavbar;
