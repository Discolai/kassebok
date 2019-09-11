import React from 'react'
import axios from 'axios'

import NavBar from '../navbar';
import TodoItem from './todoitem';
import TodosTemplateForm from './todostemplateform'

class DailyTodos extends React.Component {
  state = {
    datePatt: new RegExp('\\d{4}-\\d{2}-\\d{2}'),
    date: new Date().toISOString().slice(0,10),
    dailyMessage: "",
    todos: []
  }

  handleClick = (todo) => {
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

  handleTextChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  };

  handleTextSubmit = (e) => {
    axios.put(`http://localhost:8080/api/daily-todos/${this.state.date}`, {message: this.state.dailyMessage})
    .then((response) => console.log("success"))
    .catch((error) => console.log(error));
  };

  handleAdd = (template) => {
    axios.post(`http://localhost:8080/api/todos-templates`, template)
      .then((response) => this.refresh())
      .catch((error) => console.log(error));
  };

  handleNewDate = (e) =>  {
    const {value} = e.target;
    if (this.state.datePatt.test(value)) {
      this.setState({date: value}, () =>  this.refresh());
    }
  };

  getDayString(date)  {
    switch (new Date(date).getDay()) {
      case 0:
        return 'sunday';
      case 1:
        return 'monday';
      case 2:
        return 'tuesday';
      case 3:
        return 'wednesday';
      case 4:
        return 'thursday';
      case 5:
        return 'friday';
      case 6:
        return 'saturday';
      default:
        return '';
    }
  }

  refresh = () => {
    axios.get(`http://localhost:8080/api/daily-todos/${this.state.date}`).then((response) => {
      this.setState({todos: response.data.res});
      this.setState({dailyMessage: response.data.dailyMessage || ""});
    }).catch((error) => {
      axios.post(`http://localhost:8080/api/daily-todos`, {day: this.getDayString(this.state.date), dateCreated: this.state.date}).then((response) => {
        axios.get(`http://localhost:8080/api/daily-todos/${this.state.date}`).then((response) => {
          this.setState({todos: response.data.res});
          this.setState({dailyMessage: response.data.dailyMessage || ""});
        }).catch((error) => console.log(error));
      });
    });
  }


  componentDidMount() {
    this.refresh();
  }

  render () {
    return (
      <React.Fragment>
        <NavBar/>
        <div className="container">
          <h1>Daily todos</h1>
          <div className="card">
            <div className="card-body">
              <input className="form-control" type="date" value={this.state.date} onChange={this.handleNewDate}/>
              <br/>
              <div className="row">
                <div className="col-l-4 col-md-4 col-sm-6 col-xs-12">
                  {
                    this.state.todos.map((todo) => (
                      <TodoItem key={todo.id} todo={todo} onChange={this.handleClick} />
                    ))
                  }
                </div>
                <div className="col-l-8 col-md-8 col-sm-6 col-xs-12">
                  <label>Extra message</label>
                  <textarea
                    className="form-control"
                    name="dailyMessage"
                    value={this.state.dailyMessage}
                    onChange={this.handleTextChange}
                    />
                  <button className="btn btn-info" onClick={this.handleTextSubmit}>
                    Submit
                  </button>
                </div>
              </div>
              <TodosTemplateForm
              btnTxt="New todo"
              btnIcon={<i className="fa fa-plus-square" aria-hidden="true"></i>}
              onSubmit={this.handleAdd}
              modalHdr="Create new todo"
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DailyTodos;
