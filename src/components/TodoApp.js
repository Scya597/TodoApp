import React, {Component} from 'react';
import TodoList from './TodoList';
import AddTodoList from './AddTodoList';

class TodoApp extends Component {
	constructor (props) {
		super(props);
		this.state = {
			todoLists: [
				{
					listID: 1,
					listName: 'Initial',
					listContent: [
						{
							id: 1,
							text: 'One-1'
						},
						{
							id:2,
							text: 'Two-1'
						}
					]
				},
				{
					listID: 2,
					listName: 'Initial-Two',
					listContent: [
						{
							id: 1,
							text: 'One-2'
						},
						{
							id:2,
							text: 'Two-2'
						}
					]
				}
			]
		};
	}

	render () {
    var {todoLists} = this.state;
    const renderTodoLists = () => {
      return todoLists.map ((list) => {
        return <TodoList key={list.listID} list={list} />;
      });
    };

		return (
			<div>
			   {renderTodoLists()}
			</div>
		);
	}
};

export default TodoApp;
