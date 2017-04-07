import React, { Component } from 'react';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = { text: props.todo.text };
    this.handleDelete = this.handleDelete.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onChange(e) {
    this.setState({ text: e.target.value });
  }

  handleChange() {
    this.props.change(this.state.text, this.props.todo.id);
  }

  handleDelete() {
    this.props.deleteItem(this.props.todo.id);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleChange}>
          <input
            type="text"
            value={this.state.text}
            onChange={this.onChange}
          />
        </form>
        <form onSubmit={this.handleDelete}>
          <button>delete item</button>
        </form>
      </div>
    );
  }
}

export default TodoItem;
