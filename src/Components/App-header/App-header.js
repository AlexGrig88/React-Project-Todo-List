import React, { Component } from 'react';
import './App-header.css';


class AppHeader extends Component {

  state = { dateTime: new Date() }

  componentDidMount() {
    this.timerId = setInterval(
      ()=> this.setState({ dateTime: new Date() }),
      1000
    );
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  render() {
    const { toDo, done } = this.props;

    return (
      <div>
      <h1 className="title-app">Todo List</h1>
      <div className="app-header d-flex">
          <h3> { `At the moment ${this.state.dateTime.toLocaleString()} -----> ` } </h3>
          <h4>{toDo} more to do, {done} done</h4>
      </div>
    </div>
    );
  }
}


export default AppHeader;