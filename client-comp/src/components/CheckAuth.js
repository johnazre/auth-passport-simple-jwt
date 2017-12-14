import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

export default function(ComposedComponent) {
  class Authentication extends Component {

    componentWillMount() {
      if (!localStorage.getItem('user') && !this.props.auth.authenticated) {
        this.props.history.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!localStorage.getItem('user') && !nextProps.auth.authenticated) {
        this.props.history.push('/');
      }
    }

    render() {
      console.log('this.props', this.props)
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { auth: state.auth };
  }

  return connect(mapStateToProps)(Authentication);
}
