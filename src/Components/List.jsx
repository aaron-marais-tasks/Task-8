import React from "react"

export default class List extends React.Component {
	state = {
		itemList: []
	}
	inputRef = React.createRef()

	addItem = () => {
		const itemList = this.state.itemList
		itemList.push(this.inputRef.current.value)
		this.setState({itemList})
	}

	removeItem = index => () => {
		const itemList = this.state.itemList
		itemList.splice(index, 1)
		this.setState({itemList})
	}

	render() {
		return (
			<React.Fragment>
				<h1>TODO:</h1>
				<ul>
					{this.state.itemList.map((item, index) => <List.Item removeItem={this.removeItem(index)} val={item} />)}
				</ul>

				<div>
					What needs to be done?<br/>
					<input type="text" ref={this.inputRef} /><br/>
					<button onClick={this.addItem}>Add #{this.state.itemList.length + 1}</button>
				</div>
			</React.Fragment>
		)
	}
}

List.Item = props => <li><button onClick={props.removeItem}>X</button> {props.val}</li>
