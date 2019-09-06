import React from 'react'
import PropTypes from 'prop-types'
import GiftcardForm from './GiftcardForm'


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
        <td>{soldOn}</td>
        <td>{soldBy}</td>
        <td>{receivedOn}</td>
        <td>{receivedBy}</td>
        <td>
          <GiftcardForm
           btnTxt=""
           btnIcon={<i className="fa fa-cog" aria-hidden="true"></i>}
           onSubmit={this.props.onEdit}
           toEdit={this.props.giftcard}
           modalHdr="Edit giftcard"
          />
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
