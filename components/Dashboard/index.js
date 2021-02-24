import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserActions from '../../actions/userActions'
import { Link } from 'react-router'

import './style.css';

/**
 * Dashboard component
 *
 */
class Dashboard extends Component {
    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    /**
     *
     */
    componentDidMount() {
        const { getUserProfile } = this.props;
        getUserProfile('arjunw7')
    }

    /**
     *
     * @return {*}
     */
    render() {
        const { getUserProfileLoading } = this.props;
        return (
            <div className="container">
                Dashboard Component {getUserProfileLoading && 'Loading...'}
                <br/>
                <Link to={'create-investment'}>Go to Create Investment</Link>
            </div>
        )
    }
}

const mapStateToProps = ({ UserReducers }) => ({
    getUserProfileLoading: UserReducers.getUserProfileLoading
});

const mapDispatchToProps = (dispatch) => ({
    getUserProfile: (userId) => dispatch(UserActions.getUserProfile(userId))
});

Dashboard.propTypes = {
    getUserProfile: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)((Dashboard));
