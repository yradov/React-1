import React, {Component} from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component{

    state = {
        status: 'all'
    };

    buttons = [
        {name: 'all', label: 'All'},
        {name: 'active', label: 'Active'},
        {name: 'done', label: 'Done'},
    ];

    render() {
        const activeClass = 'btn-info';
        const inactiveClass = 'btn-outline-secondary';
        const {filter} = this.props;

        const buttons = this.buttons.map(({name, label}) => {
            const isActive = filter === name;
            const clazz = isActive ? activeClass : inactiveClass;
            return (
                <button type="button"
                        className={`btn ${clazz}`}
                        key={name}
                        onClick={() => this.props.filterItems(name)}>
                    {label}
                </button>
            );
        });

        return (
            <div className="btn-group">
                {buttons}
            </div>
        );

    }
}

// const ItemStatusFilterFunk = () => {
//   return (
//     <div className="btn-group">
//       <button type="button"
//               className="btn btn-info">All</button>
//       <button type="button"
//               className="btn btn-outline-secondary">Active</button>
//       <button type="button"
//               className="btn btn-outline-secondary">Done</button>
//     </div>
//   );
// };

//export default ItemStatusFilter;
