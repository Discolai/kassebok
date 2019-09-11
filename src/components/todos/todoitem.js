import React from 'react'
import PropTypes from 'prop-types'

class TodoItem extends React.Component {
  render () {
    const {todo} = this.props;

    return (
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={todo.completed}
          onChange={() => this.props.onChange(todo)}
        />
      <label
        className="form-check-label"
        onClick={() => this.props.onChange(todo)}
        >
        {todo.completed ? <s>{todo.message}</s> : todo.message}
      </label>
      </div>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default TodoItem;
