/*
  This file handles our main application
*/

// Import react into script scope
import React from 'react'

import { BrowserRouter, Route } from 'react-router-dom';

// Import our styling
import './App.css'

// Import our core components
import Header from './Components/Header'
import Product from './Components/Product'
import Landing from './Components/Landing'

// Our products list
const products = [
  {name: "PHPBadWeather", description: "This IDE is used for PHP development"},
  {name: "PythonCharmer", description: "This IDE is used for Python development"},
  {name: "WebCloudy", description: "This IDE is used for web development"},
  {name: "SeeTiger", description: "This IDE is used for C development"},
  {name: "GrippedData", description: "This IDE is used for Data Science"},
  {name: "RubyGemstones", description: "This IDE is used for Ruby development"}
]

// Export an anonymous classs as the default export
export default class extends React.Component {
  render() {
    return (
      <BrowserRouter>
        {/* Our application container */}
        <div className="App">
          {/* Our header; pass loggedIn as false */}
          <Header loggedIn={true} />

          <Route exact={true} path="/" component={() => <Landing name="I.T. Infinity">We are a collection that strives for good computers</Landing>} />
            {/* The landing page component */}

          <Route path="/products" component={() => <Product.Import from={products} />} />
        </div>
      </BrowserRouter>
    )
  }
}
