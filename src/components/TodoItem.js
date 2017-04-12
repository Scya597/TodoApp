import React, { Component } from 'react';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = { text: props.todo.text, completed: props.todo.completed };
    this.handleDelete = this.handleDelete.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ text: e.target.value });
  }

  handleChange(e) {
    e.preventDefault();
    this.props.change(this.state.text, this.props.todo.id);
  }

  handleDelete() {
    this.props.deleteItem(this.props.todo.id);
  }

  toggleCheckbox() {
    this.props.toggleCheckbox(this.props.todo.id);
  }

  render() {
    return (
      <div className="todoItem">
        <input
          type="text"
          value={this.state.text}
          onChange={this.onChange}
          onSubmit={this.handleChange}
        />
        <input
          type="checkbox"
          className="checkbox"
          checked={this.props.todo.completed}
          onClick={this.toggleCheckbox}
        />
        <img
          className="deleteItem"
          src="/style/deleteButton.jpg"
          onClick={this.handleDelete}
        />
      </div>
    );
  }
}

export default TodoItem;
