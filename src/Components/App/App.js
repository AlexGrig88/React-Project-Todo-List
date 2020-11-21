import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter, Route } from 'react-router-dom';
import axios from 'axios';

import AppATopHeader from '../App-a-top-header/App-a-top-header'
import AppHeader from '../App-header'
import TodoList from '../Todo-list';
import ItemStatusFilter from '../Item-status-filter';
import ItemAddForm from '../Item-add-form';
import About from '../Pages/About';


import './App.css';

// Мы не делаем запросов на бэкенд для создания туду айтема в данном примере,
// поэтому создаем локальный туду айтем со случайным id. В реальном приложении, мы возможно бы захотели создавать их на стороне сервера.
function createTodoItem(task) {
  return {
    id: uuidv4(),
    task,
    isCompleted: false
  }
}

class App extends Component {

  componentDidMount() {
    // проверить, есть ли туду в локальном хранилище
    const todoData = localStorage.getItem("todos");
    if (todoData) {
      this.setState({ todoData: JSON.parse(todoData) });
      return;
    }
    // взять туду из "сервера"
    axios.get("https://jsonplaceholder.typicode.com/todos?_limit=7")
      .then(response => {
        const arrNewData = response.data.map((item) => {
          return {
            id: item.id,
            task: item.title.charAt(0).toUpperCase() + item.title.slice(1),
            isCompleted: item.completed,
          }
        });
        this.setState({ todoData: arrNewData })
      })
  }

  componentDidUpdate(_prevProps, prevState) {
    if (this.state.todoData !== prevState.todoData) {
      localStorage.setItem("todos", JSON.stringify(this.state.todoData));
    }
  }

  state = {
    todoData: [],
    filter: 'all'   //active, all, done
  }

  onToggleComplete(id) {
    const todoData = this.state.todoData;
    const idx = todoData.findIndex((item) => item.id === id);  //находим индекс объекта для изменения

    const oldItem = todoData[idx];     //извлекаем этот объект
    const newItem = {
      ...oldItem,                     //и создаем новый с изменённым значение ключа isCompleted
      isCompleted: !oldItem.isCompleted
    };

    //возвращаем новый массив данных с изменённым состоянием
    this.setState({
      todoData: [
        ...todoData.slice(0, idx),
        newItem,
        ...todoData.slice(idx + 1)
      ]
    });
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((item) => item.id === id);

      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray
      };
    });
  };

  addItem = (task) => {
    this.setState({
      todoData: [
        ...this.state.todoData,
        createTodoItem(task),
      ]
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  // items это todoData
  filterItems(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.isCompleted);
      case 'done':
        return items.filter((item) => item.isCompleted);
      default:
        return items;
    }
  }

  render() {

    const { todoData, filter } = this.state;

    const visibleItems = this.filterItems(todoData, filter);
    const doneCount = todoData
      .filter((todo) => todo.isCompleted).length;
    const todoCount = todoData.length - doneCount;

    return (
      <BrowserRouter>
        <div className="todo-app">
          <AppATopHeader />
          <Route exact path="/" render={props => (
            <React.Fragment>
              <AppHeader toDo={todoCount} done={doneCount} />

              <div className="top-panel d-flex">
                <ItemStatusFilter filter={filter}
                  onFilterChange={this.onFilterChange}
                />
              </div>

              <TodoList todos={visibleItems}
                onDeleted={this.deleteItem}
                onToggleComplete={(id) => this.onToggleComplete(id)}
              />

              <ItemAddForm onItemAdded={(task) => this.addItem(task)} />
            </React.Fragment>
          )} />
          <Route path="/about" component={About} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
