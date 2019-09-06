import React from 'react'
import PropTypes from 'prop-types'

class NavBar extends React.Component {
  render () {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
      </nav>
    );
  }
}

export default NavBar;
