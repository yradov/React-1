import React, {Component} from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

    state = {
        q: ''
    };

    onSearchChange = (e) => {
        const q = e.target.value;
        this.setState({q});
        this.props.search(q);
    };

    render(){
        return (
            <input type="text"
                   className="form-control search-input"
                   placeholder="type to search"
                    value={this.state.q}
                   onChange={this.onSearchChange}
            />
        );
    }
};

