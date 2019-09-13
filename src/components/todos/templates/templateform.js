import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-responsive-modal'
import axios from 'axios'

class TodosTemplateForm extends React.Component {

  state = {
    open: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    message: "",
    inputs: [
      {label: "Monday", name: "monday", type:"checkbox", value: false},
      {label: "Tuesday", name: "tuesday", type:"checkbox", value: false},
      {label: "Wednesday", name: "wednesday", type:"checkbox", value: false},
      {label: "Thursday", name: "thursday", type:"checkbox", value: false},
      {label: "Friday", name: "friday", type:"checkbox", value: false},
      {label: "Saturday", name: "saturday", type:"checkbox", value: false},
      {label: "Message", name: "message", type:"textarea", isRequired: true, value: ""}
    ]
  }

  handleOpen = () =>  {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
    this.state.inputs.map((input) => this.setState({[input.name]: input.value}));
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  handleCheck = (e) => {
    const {name} = e.target;
    this.setState({[name]: !this.state[name]});
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let form = {...this.state};
    delete form.open;
    delete form.inputs;
    this.props.onSubmit(form);
    this.handleClose();
  }

  componentDidMount() {
    if (this.props.toEdit) {
      axios.get(`http://localhost:8080/api/todos-templates/${this.props.toEdit}`)
      .then((response) => {
        const res = response.data.res[0]
        for (var key in res) {
          this.setState({[key]: res[key]});
        }
      })
      .catch((error) => console.error(error));
    }
  }

  compileInputs() {
    const inputs = [];

    this.state.inputs.forEach((input) => {
      if (input.type === "checkbox")
       inputs.push(
        <div className="col-xs-6 col-sm-4 col-l-4 form-check" key={input.name}>
          <input
           className="form-check-input"
           type={input.type}
           checked={this.state[input.name]}
           value={this.state[input.name]}
           name={input.name}
           onChange={this.handleCheck}
          />
        <label>{input.label}</label>
        </div>
      );
    });
    inputs.push(
      <div className="col-xs-12 col-sm-12 col-l-12 form-group" key="message">
        <label>Message</label>
        <textarea
          className="form-control"
          value={this.state.message}
          name="message"
          onChange={this.handleChange}
          required
          />
      </div>
    );

    return inputs;
  }

  render () {
    const {children} = this.props;
    return (
      <React.Fragment>
        {
          children && React.Children.only(children).type === "button" ?
          React.cloneElement(React.Children.only(children), {onClick: this.handleOpen}) :
          (<button onClick={this.handleOpen}>open</button>)
        }
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
          center
          >
          <h3>{this.props.modalHdr}</h3>
          <form className="pl-2 pr-2" onSubmit={this.handleSubmit}>
            <div className="form-row">
              {this.compileInputs()}
            </div>
            <div className="mx-auto">
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </form>
        </Modal>
      </React.Fragment>
    );
  }
}

TodosTemplateForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  modalHdr: PropTypes.string.isRequired,
  toEdit: PropTypes.number
}

export default TodosTemplateForm;
