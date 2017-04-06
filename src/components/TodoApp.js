import React, { Component } from 'react';
import TodoList from './TodoList';
import AddTodoList from './AddTodoList';

const uuid = require('node-uuid');

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoLists: [
        {
          listID: 1,
          listName: 'Initial',
          listContent: [
            {
              id: 1,
              text: 'One-1',
            },
            {
              id: 2,
              text: 'Two-1',
            },
          ],
        },
        {
          listID: 2,
          listName: 'Initial-Two',
          listContent: [
            {
              id: 1,
              text: 'One-2',
            },
            {
              id: 2,
              text: 'Two-2',
            },
          ],
        },
      ],
    };
    this.addTodoItemInList = this.addTodoItemInList.bind(this);
    this.addTodoListInApp = this.addTodoListInApp.bind(this);
    this.deleteTodoItemInList = this.deleteTodoItemInList.bind(this);
    this.deleteTodoListInApp = this.deleteTodoListInApp.bind(this);
  }

  addTodoItemInList(text, id) {
    const newTodoLists = this.state.todoLists;
    newTodoLists.forEach((list) => {
      if (list.listID === id) {
        list.listContent.push({ id: uuid(), text });
      }
    });
    this.setState({ todoLists: newTodoLists });
  }

  addTodoListInApp(text) {
    const newTodoList = {
      listID: uuid(),
      listName: text,
      listContent: [],
    };
    const newTodoLists = this.state.todoLists;
    newTodoLists.push(newTodoList);
    this.setState({ todoLists: newTodoLists });
  }

  deleteTodoItemInList(deleteTodoId, deleteListId) {
    const newTodoLists = [];
    for (let i = 0; i < this.state.todoLists.length; i += 1) {
      if (this.state.todoLists[i].listID === deleteListId) {
        newTodoLists.push({
          listID: this.state.todoLists[i].listID,
          listName: this.state.todoLists[i].listName,
          listContent: this.state.todoLists[i].listContent.filter(todo => todo.id !== deleteTodoId),
        });
      } else {
        newTodoLists.push(this.state.todoLists[i]);
      }
    }
    this.setState({ todoLists: newTodoLists });
  }

  deleteTodoListInApp(deleteListId) {
    const deleteList = list => list.listID !== deleteListId;
    let newTodoLists = this.state.todoLists;
    newTodoLists = newTodoLists.filter(deleteList);
    this.setState({ todoLists: newTodoLists });
  }

  render() {
    const { todoLists } = this.state;
    const renderTodoLists = () => todoLists.map(list =>
      <TodoList
        key={list.listID}
        list={list}
        newTodo={this.addTodoItemInList}
        deleteTodo={this.deleteTodoItemInList}
        deleteTodoList={this.deleteTodoListInApp}
      />);

    return (
      <div>
        {renderTodoLists()}
        <AddTodoList newTodoList={this.addTodoListInApp} />
      </div>
    );
  }
}

export default TodoApp;
