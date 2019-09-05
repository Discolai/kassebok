import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-responsive-modal';


class GiftcardForm extends React.Component {

  state = {
    open: false,
    id: '',
    card_id: '',
    val: '',
    sold_on: '',
    sold_by: '',
    received_on: '',
    received_by: '',
    inputs: [
      {label: 'Card number', name: 'card_id', type: "number"},
      {label: 'Value', name: 'val', type: "number"},
      {label: 'Sold on', name: 'sold_on', type: "date"},
      {label: 'Sold by', name: 'sold_by', type: "text"},
      {label: 'Received on', name: 'received_on', type: "date"},
      {label: 'Received by', name: 'received_by', type: "text"},
    ]
  }


  onOpen = () => {
    if ('toEdit' in this.props) {
      for (var key in this.props.toEdit) {
        this.setState({[key]: this.props.toEdit[key]});
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

    this.props.submitFnc(form);

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
  submitFnc: PropTypes.func.isRequired,
  modalHdr: PropTypes.string.isRequired,
}

export default GiftcardForm;
