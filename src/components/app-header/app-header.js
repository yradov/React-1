import React from "react";
import './app-header.css';

const AppHeader = ({needTodo, alreadyDone}) => {
    return (
        <div className="app-header d-flex">
            <h1>Todo List</h1>
            <h2>{needTodo} more to do, {alreadyDone} done</h2>
        </div>
    );
};

export default AppHeader;