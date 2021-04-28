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
import useAccessToken from '../hooks/useAccessToken'

const Admin = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const accessToken = useAccessToken()
    const [trivias, setTrivias] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const toggleModal = () => setModalIsOpen((prev) => !prev)

    const getTrivias = async () => {
        setIsLoading(true)
        const { data } = await GET_ALL_TRIVIAS(accessToken)
        setTrivias(data)
        setIsLoading(false)
    }

    const handleTriviaSubmit = async (trivia) => {
        toggleModal()

        if (trivia._id) {
            await UPDATE_TRIVIA(trivia._id, trivia, accessToken)
            getTrivias()
        } else {
            await CREATE_TRIVIA(trivia, accessToken)
            getTrivias()
        }
    }

    const handleDelete = async (trivia) => {
        try {
            await DELETE_TRIVIA(trivia._id, accessToken)
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
        if (accessToken) {
            getTrivias()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken])

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
