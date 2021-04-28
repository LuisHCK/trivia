import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { Bar } from 'react-chartjs-2'
import { useRoomContext } from '../../context/room.context'

const Results = () => {
    const { state } = useRoomContext()

    const participants = state.participants
        ?.slice(0, 2)
        ?.sort((prev, next) => parseFloat(prev.score) - parseFloat(next.score))
        ?.reverse()

    const options = {
        reponsive: true,
        mantainAspectRatio: false,
        scales: {
            y: {
                ticks: {
                    display: false,
                },
                grid: {
                    display: false,
                    borderColor: 'transparent',
                },
            },
            x: {
                ticks: {
                    color: 'white',
                    font: {
                        size: 16,
                    },
                },
                grid: {
                    display: false,
                    borderColor: 'transparent',
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
        labels: participants.map((p) => `${p.name} ${p.score}pt`),
        datasets: [
            {
                label: 'Puntaje',
                data: participants.map((p) => p.score),
                borderWidth: 1,
                borderRadius: 15,
                borderSkipped: false,
                backgroundColor: ['#FFC107', '#C0C0C0', '#cd7f32'],
            },
        ],
    }

    return (
        <Container>
            <div className="welcome-page">
                <h2 className="page-title">Resultado final</h2>
                <div className="chart-container">
                    <Bar data={data} options={options} />
                </div>

                <Button as="a" href="/">
                    Regresar al inicio
                </Button>
            </div>
        </Container>
    )
}

export default Results
