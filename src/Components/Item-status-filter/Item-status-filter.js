import React, { Component } from 'react';

import './Item-status-filter.css';


export default class ItemStatusFilter extends Component {

  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' }
  ];

  render() {

    const { filter, onFilterChange } = this.props;

    const buttons = this.buttons.map((button) => {
      const isActive = filter === button.name;
      const clazz = isActive ? "btn-info" : "btn-outline-secondary";
      return (
        <button type="button" className={ `btn ${clazz}` }
                key={button.name}
                onClick={ () => onFilterChange(button.name) }>
          { button.label }
        </button>
      )
    }
    );
    return (
      <div className="btn-group">
        { buttons }
      </div>
    );
  }
}
