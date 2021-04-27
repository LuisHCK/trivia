import React from 'react'
import { Container } from 'react-bootstrap'
import { Bar } from 'react-chartjs-2'
import { useRoomContext } from '../../context/room.context'

const Results = () => {
    const { state, dispatch } = useRoomContext()

    const options = {
        ticks: {
            display: false,
        },
        reponsive: true,
        scales: {
            y: {
                grid: {
                    display: false,
                },
                ticks: {
                    display: false,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    }

    const data = {
        labels: state.participants.map((p) => p.name),
        datasets: [
            {
                label: 'Puntaje',
                data: state.participants.map((p) => p.score),
                borderWidth: 1,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.4)',
                    'rgba(54, 162, 235, 0.4)',
                    'rgba(255, 206, 86, 0.4)',
                    'rgba(75, 192, 192, 0.4)',
                    'rgba(153, 102, 255, 0.4)',
                    'rgba(255, 159, 64, 0.4)',
                ],
            },
        ],
    }

    return (
        <Container className="py-2">
            <h2>Resultado final</h2>
            <div style={{ backgroundColor: 'white', padding: '1rem' }}>
                <Bar data={data} options={options} />
            </div>
        </Container>
    )
}

export default Results
