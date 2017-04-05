import React, {Component} from 'react';
import TodoItem from './TodoItem';
import AddTodoItem from './AddTodoItem';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = props.list; // have to check syntax bug here
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


  render() {
    var {listContent} = this.state;
    const renderTodo = () => {
      return listContent.map((todo) => {
        return <TodoItem key={todo.id} todo={todo} />;
      });
    };

    return (
      <div>
        {renderTodo()}
      </div>
    );
  }
}


export default TodoList;
