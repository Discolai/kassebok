import React from 'react'
import axios from 'axios'

import NavBar from '../navbar';
import TodoItem from './todoitem';
import TemplateItem from './templates/templateitem'
import TodosTemplateForm from './templates/templateform'

class DailyTodos extends React.Component {
  state = {
    datePatt: new RegExp('\\d{4}-\\d{2}-\\d{2}'),
    date: new Date().toISOString().slice(0,10),
    dailyMessage: "",
    todos: [],
    templates: [],
    edit: false
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

  handleEdit = (form) =>  {
    console.log(form);
    axios.put(`http://localhost:8080/api/todos-templates/${form.templateId || form.id}`, form)
    .then((response) => {
      this.refresh();
    })
    .catch((error) => console.error(error));
  };

  handleDelete = (form) =>  {
    console.log(form);
    axios.delete(`http://localhost:8080/api/todos-templates/${form.templateId || form.id}`)
    .then((response) => {
      console.log(response);
      this.refresh();
    })
  };

  handleEditAll = () => {
    if (this.state.edit) {
      this.setState({edit: !this.state.edit});

    } else {
      this.setState({edit: !this.state.edit}, this.refresh);
    }
  }

  refresh = () => {
    if (this.state.edit) {
      axios.get(`http://localhost:8080/api/todos-templates`)
      .then((response) => {
        this.setState({templates: response.data.res});
      })
      .catch((error) => console.log(error));
    } else {
      const today = new Date().toISOString().slice(0,10);

      axios.get(`http://localhost:8080/api/daily-todos/${this.state.date}`).then((response) => {
        this.setState({todos: response.data.res});
        this.setState({dailyMessage: response.data.dailyMessage || ""});
      }).catch((error) => {
        if (this.state.date !== today) {
          this.setState({todos: []});
          return;
        }
        axios.post(`http://localhost:8080/api/daily-todos`, {dateCreated: this.state.date})
        .then((response) => {
          axios.get(`http://localhost:8080/api/daily-todos/${this.state.date}`).then((response) => {
            this.setState({todos: response.data.res});
            this.setState({dailyMessage: response.data.dailyMessage || ""});
          }).catch((error) => {
            this.setState({todos: []});
          });
        })
        .catch((error) => this.setState({todos: []}));
      });
    }
  }


  componentDidMount() {
    this.refresh();
  }

  renderTodos() {
    return (
      <React.Fragment>
        <React.Fragment>
          <table className="table table-striped table-bordered">
            <tbody>
              {
                this.state.todos.map((todo) => (
                  <tr key={todo.id}>
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onChange={this.handleClick}
                      onEdit={this.handleEdit}
                      onDelete={this.handleDelete}
                    />
                  </tr>
                ))
              }
            </tbody>
          </table>
            <br/>
            <label>Extra message</label>
            <textarea
              className="form-control"
              name="dailyMessage"
              value={this.state.dailyMessage}
              onChange={this.handleTextChange}
              />
            <button className="btn btn-primary mt-2" onClick={this.handleTextSubmit}>
              Submit
            </button>
            <br/>
        </React.Fragment>
      </React.Fragment>
    );
  }

  renderTemplates() {
    return (
      <table className="table table-striped table-bordered">
        <tbody>
          {
            this.state.templates.map((template) => (
              <tr key={template.id}>
                <TemplateItem
                  key={template.id}
                  template={template}
                  onEdit={this.handleEdit}
                  onDelete={this.handleDelete}
                />
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }

  render () {
    return (
      <React.Fragment>
        <NavBar/>
        <div className="container">
          <h1>Daily todos</h1>
          <div className="card">
            <div className="card-body">
              <div>
                {
                  this.state.edit ? "" :
                  (
                    <div className="input-group">
                      <input className="form-control" type="date" value={this.state.date} onChange={this.handleNewDate}/>
                      <div className="input-group-append">
                        <button className="btn btn-primary" onClick={this.refresh}>
                          <i className="fa fa-refresh" aria-hidden="true"></i>
                        </button>
                      </div>
                    </div>
                  )
                }
                <div className="mt-2 mb-2">
                  <TodosTemplateForm onSubmit={this.handleAdd} modalHdr="Create new todo">
                    <button className="btn btn-primary float-left">
                      New todo{" "}<i className="fa fa-plus-square" aria-hidden="true"></i>
                    </button>
                  </TodosTemplateForm>
                  <button className="btn btn-primary float-right" onClick={this.handleEditAll}>
                    {
                      this.state.edit ?
                      <i className="fa fa-arrow-left" aria-hidden="true"></i>
                      :
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    }
                  </button>
                </div>
              </div>
              <br/>
              <br/>
              {
                this.state.edit ?
                this.renderTemplates()
                :
                this.state.todos.length ?
                this.renderTodos()
                :
                <p>No registered todos for today!</p>
              }
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DailyTodos;
