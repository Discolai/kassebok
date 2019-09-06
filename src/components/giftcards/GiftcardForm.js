import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-responsive-modal';


class GiftcardForm extends React.Component {

  state = {
    open: false,
    cardId: '',
    value: '',
    soldOn: '',
    soldBy: '',
    receivedOn: '',
    receivedBy: '',
    inputs: [
      {label: 'Card number', name: 'cardId', type: "number"},
      {label: 'Value', name: 'value', type: "number"},
      {label: 'Sold on', name: 'soldOn', type: "date"},
      {label: 'Sold by', name: 'soldBy', type: "text"},
      {label: 'Received on', name: 'receivedOn', type: "date"},
      {label: 'Received by', name: 'receivedBy', type: "text"},
    ]
  }


  onOpen = () => {
    if ('toEdit' in this.props) {
      for (var key in this.props.toEdit) {
        if (this.props.toEdit[key]) {
          this.setState({[key]: this.props.toEdit[key]});
        }
      }
    }
    this.setState({open: true});
  }

  onClose = () => {
    // Reset all form fields and close modal
    this.setState({open: false});
    for (let k in this.state) {
      if (k === 'inputs') continue;
      this.setState({[k]: k === 'open' ? false : ''});
    }
    // this.state.inputs.map((x) => {
      // this.setState([x.name]: '');
    // });
  }

  onChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  onSubmit = (e) => {
    e.preventDefault();

    // Get form input
    let form = {...this.state};
    delete form.open;
    delete form.inputs;

    // TODO => Do some validation


    this.props.onSubmit(form);

    // Close modal
    this.onClose();
  }

  render () {
    // Create array of inputs
    const inputs = [];
    this.state.inputs.forEach((input) => {
      inputs.push(
        <div className="col-sm-6 col-xs-12 form-group" key={input.name}>
          <label>{input.label}</label>
          <input
           className="form-control"
           type={input.type}
           value={this.state[input.name]}
           name={input.name}
           onChange={this.onChange}
          />
        </div>
      );
    });

    return (
      <div>
        <button className="btn" onClick={this.onOpen}>
          {this.props.btnTxt} {this.props.btnIcon}
        </button>
        <Modal open={this.state.open} onClose={this.onClose} center>
          <h3>{this.props.modalHdr}</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-row">
              {inputs}
            </div>
            <div className="mx-auto">
              <button className="btn btn-info" type="submit">
                Submit
              </button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

GiftcardForm.propTypes = {
  btnTxt: PropTypes.string.isRequired,
  btnIcon: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  modalHdr: PropTypes.string.isRequired,
}

export default GiftcardForm;
