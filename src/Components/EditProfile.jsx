import React from "react"
import "./Styling/EditProfile.css"
import to from "to-case"
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

const EditButton = props => props.displayed ? (
	<div className="control" onClick={props.onClick}>
		{props.text}
	</div>
) : null

class Content extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			updates: {}
		}
	}

	onChange = name => ({target: {value}}) => {
		const updates = this.state.updates
		updates[name] = value
		this.setState({updates})
		this.props.handleChange(name, value)
	}

	componentWillReceiveProps(nextProps) {
		if(!nextProps.editing) this.setState({updates: {}})
	}

	render() {
		return Object.entries(this.props.items).map(([title, value], index) => (
			<div className="item" key={index}>
				<div className="title">{to.capital(title)}</div>
				{(() => {
					let isValueDate = Object.prototype.toString.call(value) === "[object Date]" && !isNaN(value)
					if(this.props.editing) {
						if(isValueDate) {
							return <DatePicker selected={value} />
						}

						return <input type="text" className="value" value={this.state.updates[title]||value}
							onChange={this.onChange(title)} />
					}

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

export default class extends React.Component {
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

	shouldComponentUpdate(_, nextState) {
		if(!nextState.willUpdate) return false
		console.log("yep")
		return true
	}

	handleChange = (title, value) => {
		const updates = this.state.updates
		updates[title] = value
		this.setState({ updates, willUpdate: false })
	}

	render() {
		return (
			<div className="edit-profile">
				<div className="content">
					<Content editing={this.state.editing} handleChange={this.handleChange}
						delayUpdate items={this.state.user} />
				</div>

				<div className="controls">
					<EditButton displayed={!this.state.editing} text="Edit"
						onClick={() => this.setState({editing: true, willUpdate: true})} />
					<EditButton displayed={this.state.editing} text="Save"
						onClick={() => {
							const user = this.state.user
							for(const [title, value] of Object.entries(this.state.updates)) {
								user[title] = value
							}
							this.setState({editing: false, user, willUpdate: true})
						}} />
					<EditButton displayed={this.state.editing} text="Cancel"
						onClick={() => {
							this.setState({editing: false, updates: {}, willUpdate: true})
						}} />
				</div>
			</div>
		)
	}
}
