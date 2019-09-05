import React from 'react';
import GiftCardItem from './GiftcardItem';
import PropTypes from 'prop-types';
import GiftcardForm from './GiftcardForm';
import axios from 'axios';


class GiftCards extends React.Component {
  state = {
    giftcards: [
    ]
  }


  addGiftcard = (giftcard) => {

    axios.post('http://localhost:8080/api/giftcards', giftcard)
    .then((response) => {
      const giftcards = [...this.state.giftcards];
      giftcards.push(giftcard);
      this.setState({giftcards: giftcards});
    })
    .catch((error) => {
      console.log(error);
    });

  }

  editGiftcard = (giftcard) => {
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
         submitFnc={this.addGiftcard}
         modalHdr="Create new giftcard"
        />
        <table className="table">
          <thead>
            <tr>
              <th>Card Number</th>
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
                <GiftCardItem key={giftcard.id} giftcard={giftcard} editFunc={this.editGiftcard}/>
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
