import React, { Component } from 'react'
import Axios from 'axios';
import { URL } from '../Constants';

export default class Dashboard extends Component {


    constructor(props) {
        super(props)

        console.log(props)

        if(!props.location.state.user) {
            return props.history.push('/login')
        }

        this.state = {
            user: props.location.state.user,
        }
    }

    componentDidMount() {
        
        if(this.props.location.state.user) {
            Axios.get(URL + '/users/' + this.props.location.state.user.id)
                .then(data => {
                    this.setState({user: data.data.user})
                })
        }
    }

    render() {

        if(!this.props.location.state.user) {
            return <div>Loading...</div>
        }

        const {user} = this.state;
        return (
            <div className="dashboardContainer">
                <h1>Your CO2 score:</h1>
                <h1 className="scoreHeader">{user.score}</h1>
                <button className="button">Add Activity</button>
            </div>
        )
    }
}
