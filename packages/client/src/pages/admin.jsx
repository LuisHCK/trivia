import React, { Fragment, useEffect, useState } from 'react'
import AdminNavbar from '../components/admin-navbar'
import { Container, Row } from 'react-bootstrap'
import QuizCard from '../components/quizz-card'
import QuizEdit from '../components/quizz-edit'
import { QuestionFormProvider } from '../context/question-form-context'
import NewQuizCard from '../components/new-quiz-card'
import {
    CREATE_TRIVIA,
    UPDATE_TRIVIA,
    GET_ALL_TRIVIAS,
    DELETE_TRIVIA,
} from '../providers/trivia.admin.provider'
import Loading from '../components/loading'

const Admin = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [trivias, setTrivias] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const toggleModal = () => setModalIsOpen((prev) => !prev)

    const getTrivias = async () => {
        setIsLoading(true)

        try {
            const { data } = await GET_ALL_TRIVIAS()
            setTrivias(data)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.error(error)
        }
    }

    const handleTriviaSubmit = async (trivia) => {
        toggleModal()

        if (trivia._id) {
            await UPDATE_TRIVIA(trivia._id, trivia)
            getTrivias()
        } else {
            await CREATE_TRIVIA(trivia)
            getTrivias()
        }
    }

    const handleDelete = async (trivia) => {
        try {
            await DELETE_TRIVIA(trivia._id)
            getTrivias()
        } catch (error) {
            console.log(error)
        }
    }

    const renderQuizzes = () =>
        trivias?.map((quiz, index) => (
            <QuizCard
                key={`quizz-card-${index}`}
                onClickEdit={toggleModal}
                onClickDelete={handleDelete}
                quiz={quiz}
            />
        ))

    useEffect(() => {
        getTrivias()
    }, [])

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
                    onSubmit={handleTriviaSubmit}
                />
                {isLoading && <Loading />}
            </Fragment>
        </QuestionFormProvider>
    )
}

export default Admin
