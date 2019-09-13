import React from 'react'
import PropTypes from 'prop-types'
import TodosTemplateForm from './todostemplateform'


class TodoItem extends React.Component {
  render () {
    const {todo} = this.props;

    return (
      <React.Fragment>
        <td width="5%">
          <input
            className="form-check align-middle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => this.props.onChange(todo)}
            />
        </td>
        <td>
          <label
            className="form-check-label"
            onClick={() => this.props.onChange(todo)}
            >
            {todo.completed ? <s>{todo.message}</s> : todo.message}
          </label>
          <div className="float-right">
            <TodosTemplateForm toEdit={this.props.todo.templateId} onSubmit={this.props.onEdit} modalHdr="Edit todo">
              <button className="btn btn-primary mr-1">
                <i className="fa fa-pencil" aria-hidden="true"></i>
              </button>
            </TodosTemplateForm>
            <button className="btn btn-danger">
              <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
          </div>
        </td>
    </React.Fragment>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
}

export default TodoItem;
