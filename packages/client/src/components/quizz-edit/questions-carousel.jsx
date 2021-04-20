import React, { useEffect, useState } from 'react'
import { Carousel, Pagination } from 'react-bootstrap'
import QuestionForm from './question-form'
import {
    SET_ACTIVE_ITEM,
    useQuestionForm,
} from '../../context/question-form-context'

const QuestionsCarousel = () => {
    const { state, dispatch } = useQuestionForm()
    const [activeItem, setActiveItem] = useState(state.activeItem)

    const changeActiveItem = (index) =>
        dispatch({ type: SET_ACTIVE_ITEM, payload: index })

    useEffect(() => {
        setActiveItem(state.activeItem)
    }, [state.activeItem])

    return (
        <div className="d-flex flex-column align-items-center">
            <Carousel
                indicators={false}
                controls={false}
                interval={null}
                activeIndex={activeItem}
                onSelect={(idx) => changeActiveItem(idx)}
            >
                {state.questions?.map((question, index) => (
                    <Carousel.Item key={`question-form-${index}`}>
                        <QuestionForm
                            position={index + 1}
                            question={question}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
            <Pagination className="mt-2">
                {state.questions?.map((_, index) => (
                    <Pagination.Item
                        key={`pagination-${index}`}
                        active={activeItem === index}
                        onClick={() => changeActiveItem(index)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </div>
    )
}

export default QuestionsCarousel
