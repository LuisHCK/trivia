import React, { Fragment, useEffect, useState } from 'react'
import AdminNavbar from '../components/admin-navbar'
import { APP_TITLE } from '../providers/app.provider'
import { Container, Row } from 'react-bootstrap'
import QuizCard from '../components/quizz-card'
import QuizEdit from '../components/quizz-edit'
import { QuestionFormProvider } from '../context/question-form-context'
import NewQuizCard from '../components/new-quiz-card'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import {
    createQuiz,
    getAllQuizzes,
    updateQuiz,
} from '../providers/trivia.admin.provider'

const Admin = () => {
    const [quizzes, setQuizzes] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const getQuizzes = async () => {
        const { data } = await getAllQuizzes()
        setQuizzes(data.data)
    }

    useEffect(() => {
        getQuizzes()
    }, [])

    const toggleModal = () => setModalIsOpen((prev) => !prev)

    const handleQuizSubmit = async (quiz) => {
        toggleModal()

        if (quiz._id) {
            await updateQuiz(quiz._id, quiz)
            getQuizzes()
        } else {
            await createQuiz(quiz)
            getQuizzes()
        }
    }

    const renderQuizzes = () =>
        quizzes.map((quiz, index) => (
            <QuizCard
                key={`quizz-card-${index}`}
                onClickEdit={toggleModal}
                quiz={quiz}
            />
        ))

    return (
        <QuestionFormProvider>
            <Fragment>
                <main className="index">
                    <AdminNavbar />

                    <Container>
                        <h1 className="mt-2">Trivias</h1>

                        <Row>
                            <NewQuizCard onClickStart={toggleModal} />
                            {renderQuizzes()}
                        </Row>
                    </Container>
                </main>
                <QuizEdit
                    isOpen={modalIsOpen}
                    onClose={toggleModal}
                    onSubmit={handleQuizSubmit}
                />
            </Fragment>
        </QuestionFormProvider>
    )
}

export default withAuthenticationRequired(Admin, {
    onRedirecting: () => <div>Loading...</div>,
})
