import React from 'react';
import axios from 'axios';

import NavBar from '../navbar';
import GiftCardItem from './giftcarditem';
import GiftCardForm from './giftcardform';


class GiftCards extends React.Component {
  state = {
    giftcards: [],
    danger: undefined,
    warning: undefined,
    success: undefined
  }

  handleError = (err) =>  {
    switch (err.response.status) {
      case 400:
        if (err.response.data.errno === 1062) {
          this.setState({warning: "Duplicate GiftCard id!"})
        } else {
          this.setState({warning: "Invalid user input!"})
        }
        break;
      case 404:
        this.setState({warning: "Giftcard not found!"})
        break;
      case 401:
        this.props.history.push("/?m=Unauthorized");
        break;
      default:
        console.log(err);
    }
    this.setState({danger: undefined, success: undefined})
  };


  handleAdd = (giftcard) => {
    axios.post('/api/giftcards', giftcard)
    .then((response) => {
      const giftcards = [...this.state.giftcards];
      giftcard.id = response.data.insertId;
      giftcards.push(giftcard);
      this.setState({giftcards: giftcards});
      this.setState({success: "Added giftcard succesfully!", danger: undefined, warning: undefined});
    })
    .catch(this.handleError)

  }

  handleEdit = (giftcard) => {
    axios.put(`/api/giftcards/${giftcard.id}`, giftcard)
    .then((response) => {
      const giftcards = [...this.state.giftcards].map(g => g = g.id === giftcard.id ? giftcard : g);
      this.setState({giftcards: giftcards});
      this.setState({success: "Edited giftcard succesfully!", danger: undefined, warning: undefined});
    })
    .catch(this.handleError);
  }

  handleDelete = (giftcard) =>  {
    axios.delete(`/api/giftcards/${giftcard.id}`)
    .then((response) => {
      this.setState({giftcards: this.state.giftcards.filter((g) => g.id !== giftcard.id)});
      this.setState({success: "Deleted giftcard succesfully!", danger: undefined, warning: undefined});
    })
    .catch(this.handleError);
  }

  refresh = () => {
    axios.get('/api/giftcards').then((response) => {
      this.setState({giftcards: response.data.res});
    })
    .catch(this.handleError);
  };

  componentDidMount() {
    this.refresh();
  }

  renderAlert(type) {
    const classes = `alert alert-${type} alert-dismissible fade show`;
    return (
      <div className={classes} role="alert">
        {this.state[type]}
        <button type="button" className="close" data-dismiss="alert" aria-label="Close"
         onClick={() => this.setState({[type]: undefined})}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        <NavBar/>
        <div className="container">
          <div className="row mt-2">
            <div className="col-l-2 col-sm-4 col-xs-12">
              <h2>Giftcards</h2>
            </div>
            <div className="col-l-2 col-sm-2 col-xs-2">
              <button className="btn btn-primary" onClick={this.refresh}>
                <i className="fa fa-refresh" aria-hidden="true"></i>
              </button>
            </div>
            <div className="col-l-2 col-sm-4 col-xs-2">
              <GiftCardForm onSubmit={this.handleAdd} modalHdr="Create new giftcard">
                <button className="btn btn-primary">
                  New giftcard{" "}<i className="fa fa-plus" aria-hidden="true"></i>
                </button>
              </GiftCardForm>
            </div>
            <div className="col-xs-12">
              {this.state.danger ? this.renderAlert("danger") : ""}
              {this.state.warning ? this.renderAlert("warning") : ""}
              {this.state.success ? this.renderAlert("success") : ""}
            </div>
          </div>
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Card id</th>
                <th>Value</th>
                <th>Sold on</th>
                <th>Sold by</th>
                <th>Received on</th>
                <th>Received by</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.giftcards.map((giftcard) => (
                  <GiftCardItem key={giftcard.id} giftcard={giftcard} onEdit={this.handleEdit} onDelete={this.handleDelete}/>
                ))
              }
            </tbody>
          </table>
          { this.state.giftcards.length === 0 ? <p>No giftcards available!</p> : "" }
        </div>
      </React.Fragment>
    );
  }
}

export default GiftCards;
