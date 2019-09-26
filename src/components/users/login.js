import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {getCsrfToken} from '../../utility';

class Login extends React.Component {

  state = {
    user: "nikolainh@hotmail.com",
    password: "12345678910"
  }

  handleLogin = (e) => {
    e.preventDefault();

    axios.post(`/api/users/login`, {
      withCredentials: true,
      nameEmail: this.state.user,
      password: this.state.password
    })
      .then((res) =>  {
        this.props.history.push("/giftcards");
      })
      .catch((err) => {
        console.error(err);
      })
  };

  handleLogout = (e) => {
    axios.post(`/api/users/logout`, "", {headers: {"x-csrf-token": getCsrfToken()}})
    .then((res) =>  {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  };

  render () {
    return (
      <div className="d-flex justify-content-center" style={{paddingTop: "200px"}}>
        <form onSubmit={this.handleLogin}>
          <img src="https://image.shutterstock.com/image-vector/user-icon-trendy-flat-style-600w-418179865.jpg"
            className="mb-4" width="250px"
          />
        <h2>Sign in</h2>
          <div className="form-group">
            <input
              className="form-control"
              name="user" type="text"
              onChange={this.handleChange}
              placeholder="Username/Email"
              required
              autoFocus
              value={this.state.user}/>
            <input
              className="form-control"
              name="password" type="password"
              onChange={this.handleChange}
              placeholder="Password"
              value={this.state.password}/>
          </div>
          <button className="btn btn-primary" type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
