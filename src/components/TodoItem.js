import React from 'react';

const TodoItem = (props) => {
  //
  // this.state = {
  //   id: 1,
  //   text: 'One-1'
  // }

  const { text } = props.todo;
  return (
    <div>
      {text}
    </div>
  );
};

export default TodoItem;
