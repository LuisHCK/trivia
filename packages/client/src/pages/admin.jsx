import React, { Fragment, useEffect, useState } from 'react'
import AdminNavbar from '../components/admin-navbar'
import { Container, Row } from 'react-bootstrap'
import QuizCard from '../components/quizz-card'
import QuizEdit from '../components/quizz-edit'
import { QuestionFormProvider } from '../context/question-form-context'
import NewQuizCard from '../components/new-quiz-card'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import {
    CREATE_TRIVIA,
    UPDATE_TRIVIA,
    GET_ALL_TRIVIAS,
} from '../providers/trivia.admin.provider'
import Loading from '../components/loading'
import useAccessToken from '../hooks/useAccessToken'

const Admin = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const accessToken = useAccessToken()
    const [trivias, setTrivias] = useState()

    const toggleModal = () => setModalIsOpen((prev) => !prev)

    const getTrivias = async () => {
        const { data } = await GET_ALL_TRIVIAS(accessToken)
        setTrivias(data)
    }

    const handleTriviaSubmit = async (trivia) => {
        toggleModal()

        if (trivia._id) {
            await UPDATE_TRIVIA(trivia._id, trivia, accessToken)
        } else {
            await CREATE_TRIVIA(trivia, accessToken)
            getTrivias()
        }
    }

    const renderQuizzes = () =>
        trivias?.map((quiz, index) => (
            <QuizCard
                key={`quizz-card-${index}`}
                onClickEdit={toggleModal}
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
            </Fragment>
        </QuestionFormProvider>
    )
}

export default withAuthenticationRequired(Admin, {
    onRedirecting: () => <Loading />,
})
