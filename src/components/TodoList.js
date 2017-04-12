import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { newTodotext: '', inputListname: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleDeleteList = this.handleDeleteList.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleItemChange = this.handleItemChange.bind(this);
    this.onChangelistName = this.onChangelistName.bind(this);
    this.handlelistNameChange = this.handlelistNameChange.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
  }

  onChange(e) {
    this.setState({ newTodotext: e.target.value });
  }

  onChangelistName(e) {
    this.setState({ inputListname: e.target.value });
  }

  handleItemChange(content, todoId) {
    this.props.todoItemChange(content, todoId, this.props.list.listID);
  }

  handlelistNameChange(e) {
    e.preventDefault();
    this.props.todolistNameChange(this.state.inputListname, this.props.list.listID);
    this.setState({ inputListname: '' });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.newTodo(this.state.newTodotext, this.props.list.listID);
    this.setState({ newTodotext: '' });
  }

  handleDeleteItem(deleteTodoId) {
    this.props.deleteTodo(deleteTodoId, this.props.list.listID);
  }

  handleDeleteList() {
    this.props.deleteTodoList(this.props.list.listID);
  }

  toggleCheckbox(todoId) {
    this.props.toggleTodoItemCheckbox(todoId, this.props.list.listID);
  }

  render() {
    const { listContent } = this.props.list;
    const renderTodo = () => listContent.map(todo =>
      <TodoItem
        key={todo.id}
        todo={todo}
        deleteItem={this.handleDeleteItem}
        change={this.handleItemChange}
        toggleCheckbox={this.toggleCheckbox}
      />);

    return (
      <div className="todoList">
        <h4>{this.props.list.listName}</h4>
        <form onSubmit={this.handlelistNameChange}>
          <input
            type="text"
            value={this.state.inputListname}
            onChange={this.onChangelistName}
            placeholder="Change List Name"
          />
        </form>
        <button className="deleteList" onClick={this.handleDeleteList}>delete list</button>
        <div className="ListContent">
          {renderTodo()}
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.newTodotext}
            onChange={this.onChange}
            placeholder="Add TodoItem"
          />
        </form>
      </div>
    );
  }
}

export default TodoList;
