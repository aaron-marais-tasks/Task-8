/*
  This file handles our main application
*/

// Import react into script scope
import React from 'react'

import { BrowserRouter, Route } from 'react-router-dom';

// Import our styling
import './App.css'

// Import our core components
import Header from './Components/Header.jsx'
import Product from './Components/Product.jsx'
import Landing from './Components/Landing.jsx'
import EditProfile from './Components/EditProfile.jsx'

// Our products list
const products = [
  {name: "PHPBadWeather", description: "This IDE is used for PHP development"},
  {name: "PythonCharmer", description: "This IDE is used for Python development"},
  {name: "WebCloudy", description: "This IDE is used for web development"},
  {name: "SeeTiger", description: "This IDE is used for C development"},
  {name: "GrippedData", description: "This IDE is used for Data Science"},
  {name: "RubyGemstones", description: "This IDE is used for Ruby development"}
]

// Export an anonymous class as the default export
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = {
      loggedIn: false
    }
  }

  render() {
    return (
      <BrowserRouter>
        {/* Our application container */}
        <div className="App">
          {/* Our header; pass loggedIn as state false */}
          <Header loggedIn={this.state.loggedIn} />

          {/* The landing page component */}
          <Route exact path="/" component={() => <Landing name="I.T. Infinity">We are a collection that strives for good computers</Landing>} />

          {/* The products list */}
          <Route path="/shop" component={() => <Product.Import from={products} />} />

          {/* The user edit profile page */}
          <Route exact path="/profile" component={EditProfile} />
        </div>
      </BrowserRouter>
    )
  }
}
