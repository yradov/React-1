import React, {Component} from 'react';
import './app.css';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            {id: 1, label: "Drink Coffe", important: false},
            {id: 2, label: "Lern React", important: true},
            {id: 3, label: "Build Awesome App", important: false},
        ]
    };

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);
            //todoData.splice(idx, 1); // Bad way to change previous state data!!!
            // const before = todoData.slice(0, idx);
            // const after = todoData.slice(idx + 1);
            // const newArray = [...before, ...after];
            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];

            return {
                todoData: newArray
            }
        });
    };

    addItem = (text) => {
        console.log('Added ', text);
        const newItem = {
            id: this.maxId++,
            label: text,
            important: false
        };

        this.setState(({todoData}) => {
            const newArray = [
                ...todoData,
                newItem
            ];

            return {
                todoData: newArray
            }
        });
    };

    onToggleImportant = (id) => {
        console.log('Toggle' +
            'Important ', id);
    };

    onToggleDone = (id) => {
        console.log('Toggle Done ', id);
    };

    render() {
        const {todoData} = this.state;

        return (
            <div className="todo-app">
                <AppHeader toDo={1} done={3}/>
                <div className="top-panel d-flex">
                    <SearchPanel/>
                    <ItemStatusFilter/>
                </div>

                <TodoList
                    todos={todoData}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <ItemAddForm onItemAdded={this.addItem}/>
            </div>
        );
    }
}

// const AppFunc = () => {
//
//     const todoData = [
//         { id: 1, label: "Drink Coffe", important: false },
//         { id: 2, label: "Lern React", important: true },
//         { id: 3, label: "Build Awesome App", important: false },
//     ];
//
//     return (
//         <div className="todo-app">
//             <AppHeader toDo={1} done={3} />
//             <div className="top-panel d-flex">
//                 <SearchPanel />
//                 <ItemStatusFilter />
//             </div>
//
//             <TodoList
//                 todos={todoData}
//                 onDeleted={(id) => console.log('Delete: ', id)}/>
//         </div>
//     );
// };
//
// export default App;