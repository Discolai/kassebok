import React from 'react'
import PropTypes from 'prop-types'

import NavBar from '../navbar';

class Tasks extends React.Component {
  render () {
    return (
      <React.Fragment>
        <NavBar/>
        <div className="container">
          <h1>Tasks</h1>
        </div>
      </React.Fragment>
    );
  }
}

export default Tasks;
