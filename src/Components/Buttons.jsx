/*
	This file holds my Button-type components
*/

// Import React scope dependency
import React from "react"

// Button component; accepts onClick and value properties (onClick must be a function that returns a function)
const Button = props => 
	<button onClick={props.onClick(props.value)}>
		{props.value}
	</button>

// Buttons component; holds all calculator buttons; accepts onItemClick property
class Buttons extends React.Component {
	// onItemClick wrappers; accepts "value" as argument, passes item type and value, and returns click handler
	onNumberClick = value => this.props.onItemClick("number", value)
	onOperationClick = value => this.props.onItemClick("operation", value)
	onClearClick = value => this.props.onItemClick("clear", value)
	onResultClick = value => this.props.onItemClick("result")

    render() {
    	// Generating number buttons
    	const nItems = []
    	for(let i = 10; --i >= 0;)
    		nItems.push(<Button onClick={this.onNumberClick} value={i} />)

    	// Return our HTML
    	return (
    		// Wrapping buttons and bars in a few divs really helps with styling
    		<div className="buttons">
    			<div className="topbar">
    				{/* Top bar handles power of, clear, and all clear */}
					<Button onClick={this.onOperationClick} value="^x" />
					<Button onClick={this.onOperationClick} value="^2" />
					<Button onClick={this.onClearClick} value="C" />
					<Button onClick={this.onClearClick} value="AC" />
    			</div>

	    		<div className="body">
	    			{/* We add number items here, above dot and equals */}
	    			{nItems}
					<Button onClick={this.onNumberClick} value="." />
					<Button onClick={this.onResultClick} value="=" />
				</div>

    			<div className="sidebar">
    				{/* Right sidebar handles basic math ops */}
					<Button onClick={this.onOperationClick} value="/" />
					<Button onClick={this.onOperationClick} value="x" />
					<Button onClick={this.onOperationClick} value="-" />
					<Button onClick={this.onOperationClick} value="+" />
    			</div>
			</div>
		)
    }
}

// Export Buttons component as default
export default Buttons
