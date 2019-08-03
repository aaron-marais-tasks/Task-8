/*
	This file handles the main logic for my todo list
*/

// Import React into script scope
import React from "react"

// Export named component "List"
export default class List extends React.Component {
	// Initial state
	state = {
		itemList: []
	}

	// Input ref for input item
	inputRef = React.createRef()

	// Add an item to the list; gets item list, pushes into item list, updates component state
	addItem = () => {
		const itemList = this.state.itemList
		itemList.push(this.inputRef.current.value)
		this.setState({itemList})
	}

	// Remove an item from the list; gets item list, splices out item by index, updates components state
	// NOTE :: Initially called by component "List", which passes resulting function to child VIA props
	removeItem = index => () => {
		const itemList = this.state.itemList
		itemList.splice(index, 1)
		this.setState({itemList})
	}

	render() {
		return (
			// Render using react fragment
			<React.Fragment>
				<h1>TODO:</h1>

				{/* HTML list generation uses removeItem callback above to update parent */}
				<ul>
					{this.state.itemList.map((item, index) => <List.Item removeItem={this.removeItem(index)} val={item} />)}
				</ul>

				<div>
					What needs to be done?<br/>

					{/* Using refs on input box to get value */}
					<input type="text" ref={this.inputRef} /><br/>

					{/* Button to add items to list */}
					<button onClick={this.addItem}>Add #{this.state.itemList.length + 1}</button>
				</div>
			</React.Fragment>
		)
	}
}

// Generates list items and removal button
List.Item = props => <li><button onClick={props.removeItem}>X</button> {props.val}</li>
