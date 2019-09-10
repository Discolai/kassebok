import React from 'react'
import axios from 'axios'

import NavBar from '../navbar';
import TodoItem from './todoitem';

class Todos extends React.Component {
  state = {
    todos: []
  }

  onClick = (todo) => {
    todo.completed = !todo.completed;
    axios.put(`http://localhost:8080/api/todos/${todo.id}`, todo)
    .then((response) => {
      const todos = [...this.state.todos].map((t) => t = t.id === todo.id ? todo : t);

      this.setState({todos: todos});
    })
    .catch((error) => {
      console.log(error);
    });

  };

  componentDidMount() {
    const date = new Date().toISOString().slice(0,10);
    axios.get(`http://localhost:8080/api/daily-todos/${date}`).then((response) => {
      // console.log(response);
      this.setState({todos: response.data.res});
    });
  }

  render () {
    return (
      <React.Fragment>
        <NavBar/>
        <div className="container">
          <h1>Todos</h1>
          {
            this.state.todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onChange={this.onClick} />
            ))
          }
        </div>
      </React.Fragment>
    );
  }
}

export default Todos;
