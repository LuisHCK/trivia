import React from 'react'
import './index.scss'

const Loading = () => {
    return (
        <div className="loading-component">
            <img
                src="http://samherbert.net/svg-loaders/svg-loaders/grid.svg"
                alt="spinner"
                className="loading-spinner"
            />
        </div>
    )
}

export default Loading
