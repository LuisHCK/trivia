import React, { useEffect, useState } from 'react'
import { Card, ProgressBar } from 'react-bootstrap'

let TIMEOUT = 20

const QuizProgressCard = ({ index, question, started }) => {
    const [progress, setProgress] = useState(100)
    const [seconds, setSeconds] = useState(TIMEOUT)

    const updateTimer = () => {
        if (seconds > 0) {
            setSeconds((prev) => prev - 1)
        }
    }

    const percentage = (partial, total) => {
        return (100 * partial) / total
    }

    useEffect(() => {
        if (started) {
            let interval = setTimeout(updateTimer, 1000)

            return () => {
                clearTimeout(interval)
            }
        }
    })

    useEffect(() => {
        setProgress(percentage(seconds, TIMEOUT))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seconds])

    return (
        <Card
            className="mb-2"
            bg={started ? 'primary' : 'secondary'}
            text="light"
        >
            <Card.Header>Pregunta #{index + 1}</Card.Header>
            <Card.Body>
                <Card.Text>{question?.title}</Card.Text>
                {started && (
                    <ProgressBar animated variant="success" now={progress} />
                )}
            </Card.Body>
        </Card>
    )
}

export default QuizProgressCard
