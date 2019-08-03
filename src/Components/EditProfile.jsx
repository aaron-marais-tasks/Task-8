/*
	This file holds my EditProfile container
*/

// Import React and styling into scope
import React from "react"
import "./Styling/EditProfile.css"

// Import to-case and react-datepicker modules
import to from "to-case"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

// EditButton component; generates a clickable div to switch from editing to viewing
// Accepts "displayed" and "onClick" as prop, returns div.control with click handle if true,
// else null
const EditButton = props => props.displayed ? (
	<div className="control" onClick={props.onClick}>
		{props.text}
	</div>
) : null

// Content component; generates a list of items in your profile
// Accepts "items", "editing", and "handleChange" as properties
// "handleChange" property is for textbox change events
class Content extends React.Component {
	// Set initial state
	constructor(props) {
		super(props)
		this.state = {
			updates: {}
		}
	}

	// onChange handler: accepts "name" as parameter, returns event function
	// Event function unpacks "<arg1>.target.value" into "value"
	onChange = name => ({target: {value}}) => {
		// Get update array, update item with that name in the array, refresh state, and 
		// handle change in parent
		const updates = this.state.updates
		updates[name] = value
		this.setState({updates})
		this.props.handleChange(name, value)
	}

	// Reset updates in state if next props disables editing
	componentWillReceiveProps(nextProps) {
		if(!nextProps.editing) this.setState({updates: {}})
	}

	// Render list of items
	render() {
		// Converts object into array of keys and values, maps over those, and generates profile items
		return Object.entries(this.props.items).map(([title, value], index) => (
			// div.item for holding content
			<div className="item" key={index}>
				{/* div.title is capitalized using `to-case` library */}
				<div className="title">{to.capital(title)}</div>

				{/* Generate either input, or plaintext, based on type of object, using immediate-call function */}
				{(() => {
					// Variable for if is a date object
					let isValueDate = Object.prototype.toString.call(value) === "[object Date]" && !isNaN(value)

					// If editing
					if(this.props.editing) {
						// If is a date object, return a datepicker
						if(isValueDate) return <DatePicker selected={value} />

						// If not a date object, return an input box, with initial value and onChange handler
						return <input type="text" className="value" value={this.state.updates[title]||value}
							onChange={this.onChange(title)} />
					}

					// If not editing, return plain text
					return (
						<div className="value">
							{isValueDate ? (
								`${value.getFullYear()}/${value.getMonth()}/${value.getDate()}`
							) : value}
						</div>
					)
				})()}
			</div>
		))
	}
}

// Export anonymous component class
export default class extends React.Component {
	// Set initial state, and bind handleChange to our object
	constructor(props) {
		super(props)
		this.state = {
			editing: false,
			user: {
				name: "Aaron",
				surname: "Marais",
				birthday: new Date(1996, 11, 11),
				handle: "gear4"
			},
			updates: {},
			willUpdate: true
		}

		this.handleChange = this.handleChange.bind(this)
	}

	// Handle whether or not component should update
	shouldComponentUpdate(_, nextState) {
		if(!nextState.willUpdate) return false
		return true
	}

	// Handle text change
	handleChange = (title, value) => {
		const updates = this.state.updates
		updates[title] = value
		this.setState({ updates, willUpdate: false })
	}

	render() {
		return (
			// Rander container
			<div className="edit-profile">
				{/* Content container; accepts editing, handleChange, and items as properties */}
				<div className="content">
					<Content editing={this.state.editing} handleChange={this.handleChange} items={this.state.user} />
				</div>

				{/* Controls container */}
				<div className="controls">
					{/* Edit buttons displayed based on "displayed" property */}

					{/* Edit button; on click, set editing to true */}
					<EditButton displayed={!this.state.editing} text="Edit"
						onClick={() => this.setState({editing: true, willUpdate: true})} />

					{/* Save button; on click, update user in state, set editing to false */}
					<EditButton displayed={this.state.editing} text="Save"
						onClick={() => {
							const user = this.state.user
							for(const [title, value] of Object.entries(this.state.updates)) {
								user[title] = value
							}
							this.setState({editing: false, user, willUpdate: true})
						}} />

					{/* Cancel button; on click, set editing to false, and clear updates */}
					<EditButton displayed={this.state.editing} text="Cancel"
						onClick={() => {
							this.setState({editing: false, updates: {}, willUpdate: true})
						}} />
				</div>
			</div>
		)
	}
}
