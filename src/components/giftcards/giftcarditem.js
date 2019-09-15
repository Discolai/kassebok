import React from 'react'
import PropTypes from 'prop-types'
import GiftCardForm from './giftcardform'

import {formatDate} from '../../utility'

class GiftCardItem extends React.Component {
  state = {
    edit: false
  }

  render () {
    const {cardId, value, soldOn, soldBy, receivedOn, receivedBy} = this.props.giftcard;
    return (
      <tr>
        <th>{cardId}</th>
        <td>{value}</td>
        <td>{soldOn ? formatDate(soldOn) : ""}</td>
        <td>{soldBy}</td>
        <td>{receivedOn}</td>
        <td>{receivedBy ? formatDate(receivedBy) : ""}</td>
        <td>
          <GiftCardForm
           onSubmit={this.props.onEdit}
           toEdit={this.props.giftcard}
           modalHdr="Edit giftcard"
          >
            <button className="btn btn-primary">
              <i className="fa fa-pencil" aria-hidden="true"></i>
            </button>
          </GiftCardForm>
        </td>
      </tr>
    );
  }
}

GiftCardItem.propTypes = {
  giftcard: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired
}

export default GiftCardItem;
