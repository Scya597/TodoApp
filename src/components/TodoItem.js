import React, { Component } from 'react';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = props.todo;
    this.handleDelete = this.handleDelete.bind(this);
    this.state.submitText = this.state.text;
  }

  handleDelete() {
    this.props.deleteItem(this.state.id);
  }

  render() {
    const { text } = this.state;
    return (
      <div>
        <input
          type="text"
          value={text}
          onChange="HI"
        />
        <form onSubmit={this.handleDelete}>
          <button>delete item</button>
        </form>
      </div>
    );
  }
}

export default TodoItem;

// const TodoItem = (props) => {
//   //
//   // this.state = {
//   //   id: 1,
//   //   text: 'One-1'
//   // }
//
//   const handleDelete = () => {
//     props.deleteItem(props.todo.id);
//   };
//
//   const { text } = props.todo;
//   return (
//     <div>
//       <input
//         type="text"
//         value={text}
//         onChange="HI"
//       />
//       <form onSubmit={handleDelete}>
//         <button>delete item</button>
//       </form>
//     </div>
//   );
// };
//
// export default TodoItem;
