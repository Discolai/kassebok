import React from 'react'
import PropTypes from 'prop-types'

class GiftCardItem extends React.Component {
  state = {
    edit: false
  }

  render () {
    const {id, val, sold_on, sold_by, received_on, received_by} = this.props.giftcard;
    return (
      <tr>
        <th>{id}</th>
        <td>{val}</td>
        <td>{sold_on}</td>
        <td>{sold_by}</td>
        <td>{received_on}</td>
        <td>{received_by}</td>
        <td>
          <button type="button" className="btn">
            <i className="fa fa-cog" aria-hidden="true"></i>
          </button>
        </td>
      </tr>
    );
  }

  // editGiftcard = (id) => {
  //   this.setState({edit: !this.state.edit});
  // }
}

GiftCardItem.propTypes = {
  giftcard: PropTypes.object.isRequired
}

export default GiftCardItem;
