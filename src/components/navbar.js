import React from 'react'
import PropTypes from 'prop-types'
import { Link , BrowserRouter as Router } from 'react-router-dom'


class NavBar extends React.Component {
  render () {
    return (
      <nav className="navbar navbar-dark bg-dark flex-md-nowrap p-0 shadow navbar-expand-md">
        <Link to="/" className="navbar-brand col-sm-3 col-md-2 mr-0">Kassebok</Link>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
          <Link to="/giftcards" className="nav-link">Giftcards</Link>
          </li>
          <li className="nav-item">
          <Link to="/posts" className="nav-link">Posts</Link>
          </li>
          <li className="nav-item">
          <Link to="/tasks" className="nav-link">Tasks</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;
