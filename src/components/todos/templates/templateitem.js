import React from 'react'
import PropTypes from 'prop-types'
import TodosTemplateForm from './templateform'
import AcceptPopup from '../../acceptpopup'

class TemplateItem extends React.Component {
  render () {
    const {template} = this.props;

    return (
      <React.Fragment>
        <td>
          {template.message}
          <div className="float-right">
            <TodosTemplateForm toEdit={this.props.template.templateId} onSubmit={this.props.onEdit} modalHdr="Edit todo">
              <button className="btn btn-primary mr-1">
                <i className="fa fa-pencil" aria-hidden="true"></i>
              </button>
            </TodosTemplateForm>
            <AcceptPopup
              modalHdr="Are you sure you want to delete?"
              onAccept={this.props.onDelete}
              payload={this.props.template}
              role="Delete"
            >
            <button className="btn btn-danger">
              <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
            </AcceptPopup>
          </div>
        </td>
    </React.Fragment>
    );
  }
}

TemplateItem.propTypes = {
  template: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default TemplateItem;
