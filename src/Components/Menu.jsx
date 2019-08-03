/*
    This file holds our menu component
*/

// Import React, Route and Link, and styling into script scope
import React from "react"
import { Route, Link } from 'react-router-dom'
import "./Styling/Menu.css"

export default class extends React.Component {
    // Set initial state
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: props.loggedIn
        }
    }

    render() {
        return (
            // Render menu items based on if logged in or not
            <div className="menuItems">
                {this.state.loggedIn ? (
                    // If logged in, contain items in a fragment
                    <React.Fragment>
                        {/* Each item has a path array, with paths the link should appear on. */}
                        {/* If the path array is exact to some, then render appropriate links */}
                        <Route path={["/shop", "/profile"]} render={() => <Link to="/">Home</Link>} />
                        <Route exact path={["/", "/profile"]} render={() => <Link to="/shop">Shop</Link>} />
                        <Route exact path={["/", "/shop"]} render={() => <Link to="/profile">Edit profile</Link>} />
                    </React.Fragment>
                ) : (
                    // If not logged in, have a simple link to log user in. Doesn't require username
                    // or password, just click login
                    <Link to="#" onClick={() => {
                        this.setState({loggedIn: !this.state.loggedIn})
                    }}>Log In</Link>
                )}
            </div>
        )
    }
}
