import React from "react"
import { Route, Link } from 'react-router-dom'
import "./Styling/Menu.css"

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: props.loggedIn
        }
    }

    render() {
        return (
            <div className="menuItems">
                {this.state.loggedIn ? (
                    <>
                        <Route path={["/shop", "/profile"]} render={() => <Link to="/">Home</Link>} />
                        <Route exact path={["/", "/profile"]} render={() => <Link to="/shop">Shop</Link>} />
                        <Route exact path={["/", "/shop"]} render={() => <Link to="/profile">Edit profile</Link>} />
                    </>
                ) : (
                    <Link to="#" onClick={() => {
                        this.setState({loggedIn: !this.state.loggedIn})
                    }}>Log In</Link>
                )}
            </div>
        )
    }
}
