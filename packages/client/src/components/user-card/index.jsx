import React from 'react'
import { Badge, Card } from 'react-bootstrap'
import { RiVipCrownFill } from 'react-icons/ri'
import { IoMdMedal } from 'react-icons/io'

const UserCard = ({
    position,
    user,
    score,
    className,
    hideScore,
    children,
}) => {
    const renderMedal = () => {
        switch (position) {
            case 0:
                return (
                    <div className="crown">
                        <RiVipCrownFill color="#FFC107" size="2rem" />
                    </div>
                )

            case 1:
                return (
                    <div className="medal">
                        <IoMdMedal color="#C0C0C0" size="2rem" />
                    </div>
                )

            case 2:
                return (
                    <div className="medal">
                        <IoMdMedal color="#cd7f32" size="2rem" />
                    </div>
                )

            default:
                break
        }
    }

    return (
        <Card className={`mb-2 ${className}`} bg="light" text="dark">
            <Card.Body>
                <div className="d-flex align-items-center">
                    <div
                        className="avatar"
                        style={{ backgroundColor: user?.color }}
                    >
                        <span>{user?.name?.split('')[0]}</span>
                        {!!score && renderMedal()}
                    </div>
                    <div className="pl-2 d-flex justify-content-between align-items-center w-100">
                        <span className="mr-2">{user?.name}</span>
                        {!hideScore && (
                            <Badge variant="primary">
                                Puntaje: {score || 0}
                            </Badge>
                        )}
                        {children}
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default UserCard
