import React, { Component } from 'react';

import './Item-add-form.css';

class ItemAddForm extends Component {

    state = {
        task: ''
    };
    
    onLabelChange = (e) => {
        this.setState({
          task: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onItemAdded(this.state.task);
        this.setState({
          task: ''
        });
    };

    render() {
        return (
            <form className="item-add-form d-flex"
            onSubmit={this.onSubmit}>

        <input type="text"
               className="form-control"
               onChange={this.onLabelChange}
               placeholder="What needs to be done?"
               value={this.state.task} />
        <button
          className="btn btn-outline-secondary">
          Add Task
        </button>
      </form>
        );
    }
}

export default ItemAddForm;
