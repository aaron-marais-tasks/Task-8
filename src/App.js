/*
  This file contains our main application layout and logic
*/

// Import React dependendy into scope, as well as our application styling and Buttons component
import React from 'react';
import './App.css';
import Buttons from './Components/Buttons.jsx'

// App component
class App extends React.Component {
  // Set initial state
  state = {
    current: ""
  }

  // Get current result from state
  getResult = () => this.state.current.includes('.') ?
                    parseFloat(this.state.current) :
                    parseInt(this.state.current)

  // Calculate next number
  calculate = (num1, op, num2) => {
    switch (op) {
      case "-":
        return num1 - num2
      case '+':
        return num1 + num2
      case "/":
        return num1 / num2
      case "x":
        return num1 * num2
      case "^":
        return Math.pow(num1, num2)
    }
  }

  // Item click handler
  // Requires a type and value argument, and returns a function which handles DOM clicks
  onItemClick = (type, value) => e => {
    // Un-focus button
    e.target.blur()

    // Switch on type
    switch(type) {
      // Clear buttons
      case "clear": {
        if(value === "AC") {
          // All clear
          // Clear the result label, last operation and current value
          this.setState({ current: "", currentValue: undefined, lastOperation: "" })
        } else {
          // Clear the result label and break the switch
          this.setState({ current: "" })
        }
      } break

      // Numbers 0 - 9, as well as float point
      case "number": {
        // If the label includes a float point already, or it's empty, then break the switch
        if(value === "." && (this.state.current.includes('.') || this.state.current.length === 0))
          break

        // Append number or float point into the label state
        this.setState({ current: this.state.current + value })
      } break

      // Basic operators: power of X, subtract, divide, multiply, add
      case "operation": {
        let currentValue = this.state.currentValue

        // Special operation: Power of 2
        if(value !== "^2") {
          // If current value isn't set, set it to the current item in the label
          // If current value is set, calculate the number using the last operation, and update current value
          if(currentValue === undefined ) {
            currentValue = this.getResult()
          } else {
            let newValue = this.getResult()

            if(value !== "^x") {
              currentValue = this.calculate(currentValue, this.state.lastOperation, newValue)
            }
          }

          // If current value is not a number, break switch
          if(Number.isNaN(currentValue))
            break

          // Update the last operation, clear the label, and break the switch
          // Using index[0] because power of X includes the x in the operation
          this.setState({ current: "", currentValue, lastOperation: value[0] })
          break
        }

        // Set label to be "2", set currentValue to get result if power of 2, and set last operation to power
        this.setState({ current: "2", currentValue: this.getResult(), lastOperation: "^" })
      }

      case "result": {
        // Variable to hold the label's current item and current vale
        const newValue = this.getResult()
        let currentValue = this.state.currentValue

        // If the new value is a number, and the current value is defined, then calculate the new number
        // If the current value is undefined, then set the current value to the new value
        if(!Number.isNaN(newValue) && currentValue !== undefined) {
            currentValue = this.calculate(currentValue, this.state.lastOperation, newValue)
        } else if(currentValue === undefined) {
            currentValue = newValue
        }

        // If the current value is not a number, break switch
        if(Number.isNaN(currentValue))
          break

        if(value !== "^2") {
          // Update the label to hold the current value, set current value to undefined, and clear last operation
          this.setState({currentValue: undefined, lastOperation: "", current: currentValue.toString()})
        } else {
          // Dont clear current value and last operation if the event button is power of two
          this.setState({current: currentValue.toString()})
        }
      }
    }
  }

  render() {
    return (
      // Use a container to hold all items
      <div className="container">
        {/* Results container */}
        <div className="result">{this.state.current}</div>

        {/* Buttons container */}
        <Buttons onItemClick={this.onItemClick} />
      </div>
    );
  }
}

// Export our app
export default App;
