import React, { Component } from 'react';
import TodoItem from './TodoItem';
// import AddTodoItem from './AddTodoItem';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '', listname: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleDeleteList = this.handleDeleteList.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleItemChange = this.handleItemChange.bind(this);
    this.onChangelistName = this.onChangelistName.bind(this);
    this.handlelistNameChange = this.handlelistNameChange.bind(this);
  }

// // DATA
//   this.state = {
//     listID: 1,
//     listName: 'Initial',
//     listContent: [
//       {
//         id: 1,
//         text: 'One-1'
//       },
//       {
//         id:2,
//         text: 'Two-1'
//       }
//     ]
//   }
// //////

  onChange(e) {
    this.setState({ text: e.target.value });
  }

  onChangelistName(e) {
    this.setState({ listname: e.target.value });
  }

  handleItemChange(content, todoId) {
    this.props.todoItemChange(content, todoId, this.props.list.listID);
  }

  handlelistNameChange(e) {
    e.preventDefault();
    this.props.todolistNameChange(this.state.listname, this.props.list.listID);
    this.setState({ listName: '' });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.newTodo(this.state.text, this.props.list.listID);
    this.setState({ text: '' });
  }

  handleDeleteItem(deleteTodoId) {
    this.props.deleteTodo(deleteTodoId, this.props.list.listID);
  }

  handleDeleteList() {
    this.props.deleteTodoList(this.props.list.listID);
  }

  render() {
    const { listContent } = this.props.list;
    const renderTodo = () => listContent.map(todo =>
      <TodoItem
        key={todo.id}
        todo={todo}
        deleteItem={this.handleDeleteItem}
        change={this.handleItemChange}
      />);

    return (
      <div>
        <h1>{this.props.list.listName}</h1>
        <form onSubmit={this.handlelistNameChange}>
          <input
            type="text"
            onChange={this.onChangelistName}
            value={this.state.listName}
            placeholder="change your list name"
          />
        </form>
        <div>
          {renderTodo()}
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Add your item..."
            value={this.state.text}
            onChange={this.onChange}
          />
        </form>
        <form onSubmit={this.handleDeleteList}>
          <button>delete list</button>
        </form>
      </div>
    );
  }
}

export default TodoList;
