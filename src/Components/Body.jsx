import React from "react"

class Button extends React.Component {
	render() {
		return (
			<button onClick={this.props.onClick(this.props.value)}>
				{this.props.value}
			</button>
		)
	}
}

class Buttons extends React.Component {
	onNumberClick = value => this.props.onItemClick("number", value)
	onOperationClick = value => this.props.onItemClick("operation", value)
	onResultClick = value => this.props.onItemClick("result")

    render() {
    	return (
    		<div className="buttons">
    			<div className="topbar">
					<Button onClick={this.onOperationClick} value="^x" />
					<Button onClick={this.onOperationClick} value="^2" />
					<Button onClick={this.onOperationClick} value="%" />
					<Button onClick={this.onOperationClick} value="AC" />
    			</div>
	    		<div className="body">
					<Button onClick={this.onNumberClick} value="9" />
					<Button onClick={this.onNumberClick} value="8" />
					<Button onClick={this.onNumberClick} value="7" />
					<Button onClick={this.onNumberClick} value="6" />
					<Button onClick={this.onNumberClick} value="5" />
					<Button onClick={this.onNumberClick} value="4" />
					<Button onClick={this.onNumberClick} value="3" />
					<Button onClick={this.onNumberClick} value="2" />
					<Button onClick={this.onNumberClick} value="1" />
					<Button onClick={this.onNumberClick} value="0" />
					<Button onClick={this.onNumberClick} value="." />
					<Button onClick={this.onResultClick} value="=" />
				</div>
    			<div className="sidebar">
					<Button onClick={this.onOperationClick} value="/" />
					<Button onClick={this.onOperationClick} value="x" />
					<Button onClick={this.onOperationClick} value="-" />
					<Button onClick={this.onOperationClick} value="+" />
    			</div>
			</div>
		)
    }
}

export default Buttons
