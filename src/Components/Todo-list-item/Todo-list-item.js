import React, {Component} from 'react';

import './Todo-list-item.css'

class TodoListItem extends Component {

    // getStyle = () => {
    //     return {
    //         textDecoration: this.props.todoIsCompleted ?
    //         "line-through" : "none",
    //     }
    // }

    render() {
        const { todoTask, onDeleted, onToggleComplete, todoIsCompleted} = this.props;

        let classNames = 'todo-list-item';
        if(todoIsCompleted) {
            classNames += ' done';
        }

        return (
        <div className={classNames}>
            <span className="todo-list-item-label" onClick={onToggleComplete}>
                { todoTask }
            </span>
            <button type="button"
                className="btn btn-outline-danger btn-sm float-right"
                onClick={onDeleted}>
          <i className="fa fa-trash-o" />
        </button>
        </div>
        );
    }
}

export default TodoListItem;