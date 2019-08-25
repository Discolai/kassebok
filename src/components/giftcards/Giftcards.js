import React from 'react';
import GiftCardItem from './GiftcardItem';
// import PropTypes from 'prop-types';
import GiftcardForm from './GiftcardForm';

class GiftCards extends React.Component {
  state = {
    giftcards: [
      {
        id: 0,
        card_number: 0,
        val: 500,
        sold_on: '2019-01-19',
        sold_by: 'Nikolai',
        received_on: '2019-06-23',
        received_by: 'Nikolai'
      },
      {
        id: 1,
        card_number: 1,
        val: 900,
        sold_on: '',
        sold_by: 'Nikolai',
        received_on: '',
        received_by: 'Nikolai'
      },
      {
        id: 2,
        card_number: 2,
        val: 300,
        sold_on: '',
        sold_by: 'Nikolai',
        received_on: '',
        received_by: 'Nikolai'
      }
    ]
  }

  addGiftcard = (giftcard) => {
    const giftcards = [...this.state.giftcards];
    giftcards.push(giftcard);

    this.setState({giftcards: giftcards});
  }

  editGiftcard = (giftcard) => {
    const giftcards = [...this.state.giftcards];
    for (var i = 0; i < giftcards.length; i++) {
      if (giftcards[i].id === giftcard.id) {
        giftcards[i] = giftcard;
        break;
      }
    }


    this.setState({giftcards: giftcards})
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
