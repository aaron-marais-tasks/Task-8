/*
	This file contains my header component
*/

// Import react, logo and stylesheet into script scope
import React from 'react';
import Logo from '../Images/logo.png'
import Menu from "./Menu.jsx"
import "./Styling/Header.css"

// Export an anonymous function as the default export
export default props => 
	// Rendering our header
	<header>
		{/* Our header image */}
		<img src={Logo} alt="logo" />

		{/* If user's logged in, welcome the user, otherwise ask user to sign in */}
		<Menu loggedIn={props.loggedIn} />
	</header>
