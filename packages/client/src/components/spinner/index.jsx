import React from 'react'
import { ImSpinner3 } from 'react-icons/im'
import './index.scss'

const AnimatedSpinner = (fill) => {
    return <ImSpinner3 className="animated-spinner" fill={fill} />
}

export default AnimatedSpinner
