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
            {id: 1, label: "Drink Coffe", important: false, done: false},
            {id: 2, label: "Lern React", important: true, done: false},
            {id: 3, label: "Build Awesome App", important: false, done: false},
        ],
        q: '',
        filter: 'all' // active, all, done
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
        if (!text) return false;
        const newItem = {
            id: this.maxId++,
            label: text,
            important: false,
            done: false
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
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);

            const newArray = todoData.map((el, id) => {
                if (id === idx) {
                    el.important = !el.important;
                }
                return el;
            });

            return {
                todoData: newArray,
            }
        });
    };

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);

            const newArray = todoData.map((el, id) => {
                if (id === idx) {
                    el.done = !el.done;
                }
                return el;
            });

            return {
                todoData: newArray,
            }
        });
    };

    setStatistic = () => {
        let done = this.state.todoData
            .filter((el) => el.done);

        let todo = this.state.todoData.length - done.length;

        return {
            needTodo: todo,
            alreadyDone: done.length,
        };
    };

    filterItems = (name) => {
        this.setState({filter: name});
    };

    show = (todoData, filter) => {
        let newArray;
        switch (filter) {
            case 'all':
                newArray = todoData;
                break;
            case 'active':
                newArray = todoData.filter(el => !el.done);
                break;
            case 'done':
                newArray = todoData.filter(el => el.done);
                break;
            default:
                newArray = todoData;
        }

        return newArray;
    };

    searchQuery = (q) => {
        this.setState({q: q});
    };

    search = (todoData, q) => {
        if (q === '') return todoData;

        let label = '';
        q = q.toLowerCase();
        return todoData.filter((el) => {
            label = el.label.toLowerCase();
            return label.indexOf(q) > -1;
        });
    };

    render() {
        const {todoData, q, filter} = this.state;
        const {needTodo, alreadyDone} = this.setStatistic();
        const dataToShow = this.show(this.search(todoData, q), filter);

        return (
            <div className="todo-app">
                <AppHeader needTodo={needTodo} alreadyDone={alreadyDone}/>
                <div className="top-panel d-flex">
                    <SearchPanel search={this.searchQuery}/>
                    <ItemStatusFilter
                        filter={filter}
                        filterItems={this.filterItems}
                    />
                </div>

                <TodoList
                    todos={dataToShow}
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