import React from 'react';
import GiftCardItem from './GiftcardItem';
import PropTypes from 'prop-types';
import GiftcardForm from './GiftcardForm';
import axios from 'axios';


class GiftCards extends React.Component {
  state = {
    giftcards: [
      // {
      //   id: 0,
      //   card_id: 0,
      //   value: 500,
      //   sold_on: '2019-01-19',
      //   sold_by: 'Nikolai',
      //   received_on: '2019-06-23',
      //   received_by: 'Nikolai'
      // },
      // {
      //   id: 1,
      //   card_id: 1,
      //   value: 900,
      //   sold_on: '',
      //   sold_by: 'Nikolai',
      //   received_on: '',
      //   received_by: 'Nikolai'
      // },
      // {
      //   id: 2,
      //   card_id: 2,
      //   value: 300,
      //   sold_on: '',
      //   sold_by: 'Nikolai',
      //   received_on: '',
      //   received_by: 'Nikolai'
      // }
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
                <GiftCardItem key={giftcard.card_id} giftcard={giftcard} editFunc={this.editGiftcard}/>
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
