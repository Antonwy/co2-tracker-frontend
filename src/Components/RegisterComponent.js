import React, { Component } from 'react'
import Axios from 'axios';
import { URL } from '../Constants';
import {withRouter} from 'react-router-dom'

class RegisterComponent extends Component {

    state = {
        error: false
    }

    handleOnSubmit = (event) => {
        event.preventDefault()

        let username = event.target[0].value
        let email = event.target[1].value
        let password = event.target[2].value

        if (username.length === 0 || email.length === 0 || password.length === 0) {
            this.setState({error: true})
            return console.log("Empty")
        }

        this.setState({error: false})

        Axios.post(URL + '/users/signup', {
            username, email, password
        }).then(data => {
            this.props.history.push('/dashboard')
        }).catch(err => {
            if(err) {
                this.setState({error: true})
            }
        })
    }

    handleLogin = () => {
        this.props.history.push('/login')
    }

    render() {
        const {error} = this.state
        return (
            <div className="loginComponent">
                <h1>Register</h1>
                <form onSubmit={this.handleOnSubmit}>
                    <input type="text" placeholder="Username" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button className="button" type="submit">Register</button>
                </form>
                <p>Already have an account? <span onClick={this.handleLogin}>Login</span></p>
                { error ? <a>Something went wrong...</a> : <div></div>}
            </div>
        )
    }
}

export default withRouter(RegisterComponent)