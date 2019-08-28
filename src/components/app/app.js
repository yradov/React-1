import React from 'react';
import './app.css';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';

const App = () => {

    const todoData = [
        { id: 1, label: "Drink Coffe", important: false },
        { id: 2, label: "Lern React", important: true },
        { id: 3, label: "Build Awesome App", important: false },
    ];

    return (
        <div className="todo-app">
            <AppHeader toDo={1} done={3} />
            <div className="top-panel d-flex">
                <SearchPanel />
                <ItemStatusFilter />
            </div>

            <TodoList 
                todos={todoData}
                onDeleted={(id) => console.log('Delete: ', id)}/>
        </div>
    );
};

export default App;