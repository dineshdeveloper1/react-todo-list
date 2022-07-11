import React from 'react'

// todo component ===========================
class TodoApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            text: ''
        }

        this.textChange = this.textChange.bind(this)
        this.addItem = this.addItem.bind(this)
        this.handleDeleteItem = this.handleDeleteItem.bind(this)
    }

    textChange(event) {
        this.setState({
            text: event.target.value
        })
    }

    addItem(event) {
        event.preventDefault()
        let newItem = {
            id: Date.now(),
            text: this.state.text
        }

        this.setState((oldState) => ({
            items: oldState.items.concat(newItem),
            text: ''
        }))

        console.log(this.state.text)
    }
    handleDeleteItem(itemId) {
        let updatedItems = this.state.items.filter(item => {
            return item.id !== itemId
        });
        this.setState({
            items: [].concat(updatedItems)
        })
    }

    render() {
        return (
            <>
                <h2>Todo List</h2>
                <form>
                    <input type='text' onChange={this.textChange} value={this.state.text} />
                    <button onClick={this.addItem} disabled={!this.state.text}>Add Todo List</button>
                    <TodoList items={this.state.items} onDeleteItem={this.handleDeleteItem} />
                </form>
            </>
        )
    }
}

// todo list component ==========================
class TodoList extends React.Component {
    render() {
        return (
            <>
                <ul>
                    {this.props.items.map(item => {
                        return (
                            <TodoItem key={item.id} id={item.id} text={item.text} onDeleteItem={this.props.onDeleteItem} />
                        )
                    })}
                </ul>
            </>
        )
    }
}

// todo item component ==========================
class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.deleteItem = this.deleteItem.bind(this)
    }
    deleteItem() {
        this.props.onDeleteItem(this.props.id)
    }
    render() {
        return (
            <>
                <li>{this.props.text} <button type='button' onClick={this.deleteItem}>Delete</button></li>
            </>
        )
    }
}

export default TodoApp