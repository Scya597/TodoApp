import React, { Component } from 'react';
import TodoList from './TodoList';
import AddTodoList from './AddTodoList';

const uuid = require('node-uuid');

const cloneData = (data) => {
  const jsonString = JSON.stringify(data);
  return JSON.parse(jsonString);
};

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
              completed: true,
            },
            {
              id: 2,
              text: 'Two-1',
              completed: false,
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
              completed: false,
            },
            {
              id: 2,
              text: 'Two-2',
              completed: false,
            },
          ],
        },
      ],
    };
    this.addTodoItemInList = this.addTodoItemInList.bind(this);
    this.addTodoListInApp = this.addTodoListInApp.bind(this);
    this.deleteTodoItemInList = this.deleteTodoItemInList.bind(this);
    this.deleteTodoListInApp = this.deleteTodoListInApp.bind(this);
    this.changeTodoItem = this.changeTodoItem.bind(this);
    this.changeTodolistName = this.changeTodolistName.bind(this);
    this.toggleTodoItemCheckbox = this.toggleTodoItemCheckbox.bind(this);
    this.findListandItemPosition = this.findListandItemPosition.bind(this);
    this.countComplete = this.countComplete.bind(this);
  }

  countComplete() {
    const todoLists = cloneData(this.state.todoLists);
    let countTrue = 0;
    let countFalse = 0;
    for (let i = 0; i < todoLists.length; i += 1) {
      for (let j = 0; j < todoLists[i].listContent.length; j += 1) {
        if (todoLists[i].listContent[j].completed) {
          countTrue += 1;
        } else {
          countFalse += 1;
        }
      }
    }
    return [countTrue, countFalse];
  }

  findListandItemPosition(todoId, todoListId) {
    const todoLists = cloneData(this.state.todoLists);
    let countList;
    let countItem;
    for (let i = 0; i < todoLists.length; i += 1) {
      if (todoLists[i].listID === todoListId) {
        countList = i;
      }
    }
    for (let j = 0; j < todoLists[countList].listContent.length; j += 1) {
      if (todoLists[countList].listContent[j].id === todoId) {
        countItem = j;
      }
    }
    return [countList, countItem];
  }

  addTodoItemInList(text, id) {
    const newTodoLists = cloneData(this.state.todoLists);
    newTodoLists.forEach((list) => {
      if (list.listID === id) {
        list.listContent.push({ id: uuid(), text, completed: false });
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
    let newTodoLists = cloneData(this.state.todoLists);
    newTodoLists = newTodoLists.filter(deleteList);
    this.setState({ todoLists: newTodoLists });
  }

  changeTodoItem(content, todoId, todoListId) {
    const todoLists = cloneData(this.state.todoLists);
    const [countList, countItem] = this.findListandItemPosition(todoId, todoListId);
    todoLists[countList].listContent[countItem].text = content;
    this.setState({ todoLists });
  }

  changeTodolistName(listname, todoListId) {
    const todoLists = cloneData(this.state.todoLists);
    let countList;
    for (let i = 0; i < todoLists.length; i += 1) {
      if (todoLists[i].listID === todoListId) {
        countList = i;
      }
    }
    todoLists[countList].listName = listname;
    this.setState({ todoLists });
  }

  toggleTodoItemCheckbox(todoId, todoListId) {
    const todoLists = cloneData(this.state.todoLists);
    const [countList, countItem] = this.findListandItemPosition(todoId, todoListId);
    todoLists[countList].listContent[countItem].completed ^= true;
    this.setState({ todoLists });
  }

  render() {
    const { todoLists } = this.state;
    let [isCompleted, notCompleted] = this.countComplete();
    const renderTodoLists = () => todoLists.map(list =>
      <TodoList
        key={list.listID}
        list={list}
        newTodo={this.addTodoItemInList}
        deleteTodo={this.deleteTodoItemInList}
        deleteTodoList={this.deleteTodoListInApp}
        todoItemChange={this.changeTodoItem}
        todolistNameChange={this.changeTodolistName}
        toggleTodoItemCheckbox={this.toggleTodoItemCheckbox}
      />);

    return (
      <div>
        <h1>Completed:{isCompleted} NotCompleted:{notCompleted}</h1>
        {renderTodoLists()}
        <AddTodoList newTodoList={this.addTodoListInApp} />
      </div>
    );
  }
}

export default TodoApp;
