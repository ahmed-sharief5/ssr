import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import RouterActions from '../actions/routerActions'

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.updateRouterState({
      pathname: this.props.location.pathname,
      params: this.props.params,
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname)
      this.props.updateRouterState({
        pathname: nextProps.location.pathname,
        params: nextProps.params,
      })
  }

  render() {
    const { children } = this.props
    return (
      <Fragment>
        {children}
      </Fragment>
    )
  }
}

App.propTypes = {
  navigate: PropTypes.func.isRequired,
  children: PropTypes.node,
  location: PropTypes.any,
  params: PropTypes.any,
}

function mapStateToProps(state) {
  return {

  }
}

const mapDispatchToProps = (dispatch) => ({
  navigate: (pathname) => dispatch(RouterActions.navigate(pathname)),
  updateRouterState: (state) => dispatch(RouterActions.updateRouterState(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App)
