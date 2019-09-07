import React from 'react';
import GiftCardItem from './giftcarditem';
import PropTypes from 'prop-types';
import GiftcardForm from './giftcardform';
import axios from 'axios';


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
      <div>
        <GiftcardForm
         btnTxt="Add a new giftcard"
         btnIcon={<i className="fa fa-plus-square" aria-hidden="true"></i>}
         onSubmit={this.handleAdd}
         modalHdr="Create new giftcard"
        />
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
      </div>
    );
  }
}

GiftCards.propTypes = {
  // giftcards: PropTypes.array.isRequired
}

export default GiftCards;
