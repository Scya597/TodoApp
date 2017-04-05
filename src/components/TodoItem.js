import React, {Component} from 'react';

class TodoItem extends Component {
  constructor(props) {
    super(props);
  }

  //
  // this.state = {
  //   id: 1,
  //   text: 'One-1'
  // }


  render() {
    var {text} = this.props.todo;
    return (
      <div>
        {text}
      </div>
    );
  }
}


export default TodoItem;
