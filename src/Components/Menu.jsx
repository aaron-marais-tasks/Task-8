import React from "react"
import { Link } from 'react-router-dom'

export default class extends React.Component {
    render() {
        if(!this.props.loggedIn) {
            return <h1>{this.props.loggedIn ? "Welcome" : "Please sign in"}</h1>
        }

        return (
            <div class="menuItems">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
            </div>
        )
    }
}