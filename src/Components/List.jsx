/*
	This file handles the main logic for my todo list
*/

// Import React into script scope
import React from "react"

// Import local storage helper file
import * as Storage from "../localStorageHandler"

// Import styling
import * as Styled from "./ListStyled.jsx"

// Export named component "List"
export default function List() {
	// Initial state
	const [itemList, setItemList] = React.useState(Storage.values())

	// Remove an item from the list; gets item list, splices out item by index, updates components state
	// NOTE :: Initially called by component "List", which passes resulting function to child VIA props
	const removeItem = value => {
		Storage.remove(value)
		setItemList(Storage.values())
	}

	// Add an item to the list; pushes into local storage, clears field,
	// updates component state
	const onSubmit = e => {
		e.preventDefault()
		Storage.add(e.target[0].value)
		e.target[0].value = ""
		setItemList(Storage.values())
	}

	return (
		// Render using react fragment
		<React.Fragment>
			<Styled.InputPrompter>
				What needs to be done?<br/>
				<form onSubmit={onSubmit}>
					<input type="text" /><br/>
				</form>
			</Styled.InputPrompter>

			{/* HTML list generation uses removeItem callback above 
				to update parent */}
			<Styled.ItemContainer>
				{itemList.map((item, index) =>
					<List.Item key={index} val={item}
						removeItem={removeItem}
					/>
				)}
			</Styled.ItemContainer>
		</React.Fragment>
	)
}

// Generates list items and removal button
List.Item = props => (
	<Styled.Item>
		<div class="remove" onClick={props.removeItem.bind(null, props.val)}>
			Remove
		</div>
		{props.val}
	</Styled.Item>
)
