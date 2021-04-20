import React, { useEffect, useState } from 'react'
import { Card, ProgressBar } from 'react-bootstrap'

let TIMEOUT = 20

const QuizProgressCard = ({ index, question }) => {
    const [started, setStarted] = useState(false)
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
    }, [seconds])

    return (
        <Card className="mb-2">
            <Card.Body>
                <div className="d-flex align-items-center">
                    <h5>
                        Pregunta #{index + 1}: {question?.title}
                    </h5>
                </div>
                {started && (
                    <ProgressBar animated variant="success" now={progress} />
                )}
            </Card.Body>
        </Card>
    )
}

export default QuizProgressCard
