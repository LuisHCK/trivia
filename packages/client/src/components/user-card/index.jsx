import React from 'react'
import { Badge, Card } from 'react-bootstrap'
import { RiVipCrownFill } from 'react-icons/ri'
import { IoMdMedal } from 'react-icons/io'
import styles from '../../styles/quiz.module.css'
import { getRandomColor } from '../../utils/random-color'

const UserCard = ({ position, user, score }) => {
    const renderMedal = () => {
        switch (position) {
            case 0:
                return (
                    <div className={styles.crown}>
                        <RiVipCrownFill color="#FFC107" size="2rem" />
                    </div>
                )

            case 1:
                return (
                    <div className={styles.medal}>
                        <IoMdMedal color="#C0C0C0" size="2rem" />
                    </div>
                )

            case 2:
                return (
                    <div className={styles.medal}>
                        <IoMdMedal color="#cd7f32" size="2rem" />
                    </div>
                )

            default:
                break
        }
    }

    return (
        <Card className="mb-2" bg="light">
            <Card.Body>
                <div className="d-flex align-items-center">
                    <div
                        className={styles.avatar}
                        style={{ backgroundColor: getRandomColor() }}
                    >
                        <span>{user?.name?.split('')[0]}</span>
                        {score && renderMedal()}
                    </div>
                    <div className="pl-2 d-flex justify-content-between align-items-center w-100">
                        {user?.name}
                        <Badge variant="primary">Puntaje: {score || 0}</Badge>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default UserCard
