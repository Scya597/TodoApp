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
    this.AddTodoItemInList = this.AddTodoItemInList.bind(this);
    this.AddTodoListInApp = this.AddTodoListInApp.bind(this);
  }

  AddTodoItemInList(text, id) {
    const newTodoLists = this.state.todoLists;
    newTodoLists.forEach((list) => {
      if (list.listID === id) {
        list.listContent.push({ id: uuid(), text });
      }
    });
    this.setState({ todoLists: newTodoLists });
  }

  AddTodoListInApp(text) {
    const newTodoList = {
      listID: uuid(),
      listName: text,
      listContent: [],
    };
    const newTodoLists = this.state.todoLists;
    newTodoLists.push(newTodoList);
    this.setState({ todoLists: newTodoLists });
  }

  render() {
    const { todoLists } = this.state;
    const renderTodoLists = () => todoLists.map(list =>
      <TodoList
        key={list.listID}
        list={list}
        newTodo={this.AddTodoItemInList}
      />);

    return (
      <div>
        {renderTodoLists()}
        <AddTodoList newTodoList={this.AddTodoListInApp} />
      </div>
    );
  }
}

export default TodoApp;
