import React from 'react'
import PropTypes from 'prop-types'
import GiftcardForm from './GiftcardForm'


class GiftCardItem extends React.Component {
  state = {
    edit: false
  }

  render () {
    const {card_id, val, sold_on, sold_by, received_on, received_by} = this.props.giftcard;
    return (
      <tr>
        <th>{card_id}</th>
        <td>{val}</td>
        <td>{sold_on}</td>
        <td>{sold_by}</td>
        <td>{received_on}</td>
        <td>{received_by}</td>
        <td>
          <GiftcardForm
           btnTxt=""
           btnIcon={<i className="fa fa-cog" aria-hidden="true"></i>}
           submitFnc={this.props.editFunc}
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
  editFunc: PropTypes.func.isRequired
}

export default GiftCardItem;
