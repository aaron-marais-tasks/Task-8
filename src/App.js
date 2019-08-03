import React from 'react';
import './App.css';
import Body from './Components/Body.jsx'

class App extends React.Component {
  state = {
    current: ""
  }

  getResult = () => this.state.current.includes('.') ?
                    parseFloat(this.state.current) :
                    parseInt(this.state.current)

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

  onItemClick = (type, value) => e => {
    e.target.blur()

    switch(type) {
      case "clear": {
        if(value === "AC") {
          // Clear the last operation and curent value, and continue to clear result
          this.setState({ current: "", currentValue: undefined, lastOperation: "" })
        } else {
          // Clear the result label and break the switch
          this.setState({ current: "" })
        }
      } break

      case "number": {
        if(value === "." && (this.state.current.includes('.') || this.state.current.length === 0))
          break

        this.setState({ current: this.state.current + value })
      } break

      // Basic operators: power of X, subtract, divide, multiply, add
      case "operation": {
        console.log("op", value)
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

        this.setState({ current: "2", currentValue: this.getResult(), lastOperation: "^" })

        // Get result if power is of 2
        // currentValue = this.getResult()

        // // Change the label to have a number 2
        // calcResult.innerHTML = "2"

        // // Set last operation to be power
        // lastOperation = "^"

        // Continues into calculation execution
      }

      case "result": {
        // Variable to hold the label's current item
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

        // Update the label to hold the current value, set current value to undefined, and clear last operation
        if(value !== "^2") {
          this.setState({currentValue: undefined, lastOperation: "", current: currentValue.toString()})
        } else {
          this.setState({current: currentValue.toString()})
        }
      }
    }
  }

  render() {
    return (
      <div className="container">
        <div className="result">{this.state.current}</div>
        <Body onItemClick={this.onItemClick} />
      </div>
    );
  }
}

export default App;
