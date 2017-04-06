import React, { Component } from 'react';
import TodoItem from './TodoItem';
// import AddTodoItem from './AddTodoItem';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = props.list; // have to check syntax bug here
    this.state.text = '';
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleDeleteList = this.handleDeleteList.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();
    this.props.newTodo(this.state.text, this.state.listID);
    this.setState({ text: '' });
  }

  handleDeleteItem(deleteTodoId) {
    this.props.deleteTodo(deleteTodoId, this.state.listID);
  }

  handleDeleteList() {
    this.props.deleteTodoList(this.state.listID);
  }

  render() {
    const { listContent } = this.props.list;
    const renderTodo = () => listContent.map(todo =>
      <TodoItem key={todo.id} todo={todo} deleteItem={this.handleDeleteItem} />);

    return (
      <div>
        <h1>{this.state.listName}</h1>
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
