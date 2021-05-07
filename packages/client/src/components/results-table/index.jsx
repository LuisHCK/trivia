import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Table } from 'react-bootstrap'

const ResultsTable = ({ isOpen, participants, onFinish }) => {
    return (
        <Modal show={isOpen} backdrop="static" keyboard={false} centered>
            <Modal.Header>
                <Modal.Title>Resultados de la Trivia</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th width="30%" className="text-right">
                                Puntaje total
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {participants.map((participant, index) => (
                            <tr
                                key={`participant-${participant.name}-${index}`}
                            >
                                <td>{participant.name}</td>
                                <td align="right">
                                    <b>{participant.score}</b>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Modal.Body>

            <Modal.Footer className="justify-content-center">
                <Button variant="success" onClick={onFinish}>Terminar trivia</Button>
            </Modal.Footer>
        </Modal>
    )
}

ResultsTable.defaultProps = {
    isOpen: PropTypes.bool,
    participants: PropTypes.array,
}

export default ResultsTable
