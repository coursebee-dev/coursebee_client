import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export const AccountMentor = () => {
    return (
        <div>
            
        </div>
    )
}

AccountMentor.propTypes = {
    prop: PropTypes
}

const mapStateToProps = state => ({
    auth: PropTypes.object.isRequired
});

export default connect(mapStateToProps)(AccountMentor)
