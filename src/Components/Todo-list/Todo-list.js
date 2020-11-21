import React, {Component} from 'react';
import TodoListItem from '../Todo-list-item';

import './Todo-list.css'

class TodoList extends Component {

  render() {

    const { todos, onDeleted, onToggleComplete} = this.props;
    
    const reactElements = todos.map((todo) => {
      return (
          <li key={todo.id} className="list-group-item">
            <TodoListItem todoTask={todo.task}
                          todoIsCompleted={todo.isCompleted}
                          onDeleted={() => onDeleted(todo.id)}
                          onToggleComplete={() => onToggleComplete(todo.id)}
            />
          </li>
      );
    });

    return ( 
      <ul className="list-group todo-list">
        { reactElements }
      </ul>
    );
  }
}

export default TodoList;