import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'


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
        localStorage.setItem("userName", res.data.userName);
        localStorage.setItem("csrfToken", res.data.csrfToken);
        console.log(localStorage.getItem("csrfToken"));
        this.props.history.push("/giftcards");
      })
      .catch((err) => {
        console.error(err);
      })
  };

  handleLogout = (e) => {
    axios.post(`/api/users/logout`, "", {headers: {"x-csrf-token": localStorage.getItem("csrfToken")}})
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
      <div className="container">
        <form onSubmit={this.handleLogin}>
          <input className="form-control" name="user" type="email" onChange={this.handleChange}
            value={this.state.user}/>
          <input className="form-control" name="password" type="password" onChange={this.handleChange}
            value={this.state.password}/>
          <button className="btn btn-primary" type="submit">Submit</button>
        </form>
        <br/>
        <button onClick={this.handleLogout} className="btn btn-primary">Log out</button>
      </div>
    );
  }
}

export default Login;
