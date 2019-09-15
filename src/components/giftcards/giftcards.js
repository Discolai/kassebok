import React from 'react';
import axios from 'axios';

import NavBar from '../navbar';
import GiftCardItem from './giftcarditem';
import GiftCardForm from './giftcardform';


class GiftCards extends React.Component {
  state = {
    giftcards: [
    ]
  }


  handleAdd = (giftcard) => {

    axios.post('http://localhost:8080/api/giftcards', giftcard)
    .then((response) => {
      const giftcards = [...this.state.giftcards];
      giftcard.id = response.data.insertId;
      giftcards.push(giftcard);
      this.setState({giftcards: giftcards});
    })
    .catch((error) => {
      console.log(error);
    });

  }

  handleEdit = (giftcard) => {
    const giftcards = [...this.state.giftcards].map(g => g = g.id === giftcard.id ? giftcard : g);

    axios.put(`http://localhost:8080/api/giftcards/${giftcard.id}`, giftcard)
    .then((response) => {
      this.setState({giftcards: giftcards});
    })
    .catch((error) => {
      console.log(error);
    });
  }

  componentDidMount() {
    axios.get('http://localhost:8080/api/giftcards').then((response) => {
      // console.log(response);
      this.setState({giftcards: response.data.res});
    });
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
              <button className="btn">
                Export{" "}
                <i className="fa fa-file-pdf-o" aria-hidden="true"></i>
              </button>
            </div>
            <div className="col-l-2 col-sm-4 col-xs-2">
              <GiftCardForm onSubmit={this.handleAdd} modalHdr="Create new giftcard">
                <button className="btn btn-primary">
                  New giftcard{" "}<i className="fa fa-plus" aria-hidden="true"></i>
                </button>
              </GiftCardForm>
            </div>
            <div className="col-l-2 col-sm-4 col-xs-2">
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
                  <GiftCardItem key={giftcard.id} giftcard={giftcard} onEdit={this.handleEdit}/>
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
