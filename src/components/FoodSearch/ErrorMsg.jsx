import React from 'react'
import PropTypes from 'prop-types'

const ErrorMsg = ({errorMsg}) => <div>{`${errorMsg}`}</div>


ErrorMsg.propTypes = {
    errorMsg: PropTypes.string
}

export default ErrorMsg