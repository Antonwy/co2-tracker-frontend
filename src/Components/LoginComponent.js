import React, { Component } from 'react'
import Axios from 'axios';
import { URL } from '../Constants';
import {withRouter} from 'react-router-dom'

class LoginComponent extends Component {

    state = {
        error: false
    }

    handleOnSubmit = (event) => {
        event.preventDefault()

        let email = event.target[0].value
        let password = event.target[1].value

        if (email.length === 0 || password.length === 0) {
            this.setState({error: true})
            return
        }

        this.setState({error: false})

        Axios.post(URL + '/users/login', {
            email, password
        }).then(data => {
            if(data.status === 200) {
                console.log(data.data)
                this.props.history.push('/', {user: data.data.user})
            }
        }).catch(err => {
            console.log(err.response)
            if(err) {
                this.setState({error: true})
            }
        })
    }

    handleRegister = () => {
        this.props.history.push('/register')
    }

    render() {
        const {error} = this.state
        return (
            <div className="loginComponent">
                <h1>Login</h1>
                <form onSubmit={this.handleOnSubmit}>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button className="button" type="submit">Login</button>
                </form>
                <p>No account yet? <span onClick={this.handleRegister}>Register</span></p>
                { error ? <a>Something went wrong...</a> : <div></div>}
            </div>
        )
    }
}

export default withRouter(LoginComponent)