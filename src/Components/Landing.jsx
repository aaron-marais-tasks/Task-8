/*
	This file contains my landing page renderer
*/

// Import react into script scope
import React from 'react'
import "./Styling/Landing.css"

// Export an anonymous function as the default export
export default props => (
	// Render the landing page
  	<div className="landing">
  		{/* Landing page title */}
    	<div className="title">{props.name}</div>
  		
  		{/* Landing page description */}
    	<div className="description">{props.children}</div>
  	</div>
)