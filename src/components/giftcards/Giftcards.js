import React from 'react';
import GiftCardItem from './GiftcardItem';
import PropTypes from 'prop-types';
import GiftcardForm from './GiftcardForm';

class GiftCards extends React.Component {
  render() {
    return (
      <div>
        <GiftcardForm
         btnTxt="Add a new giftcard"
         btnIcon={<i className="fa fa-plus-square" aria-hidden="true"></i>}
         modalHdr="Create new giftcard"
        />
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
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
              this.props.giftcards.map((giftcard) => (
                <GiftCardItem key={giftcard.id} giftcard={giftcard}/>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

GiftCards.propTypes = {
  giftcards: PropTypes.array.isRequired
}

export default GiftCards;
