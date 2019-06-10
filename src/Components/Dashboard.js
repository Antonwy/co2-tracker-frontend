import React, { Component } from 'react'
import Axios from 'axios';
import { URL } from '../Constants';
import AddActivityComponent from './AddActivityComponent';
import { Bar } from 'react-chartjs-2';
import Logo from '../Media/Logo.png'


export default class Dashboard extends Component {


    constructor(props) {
        super(props)

        if(!props.location.state.user) {
            return props.history.push('/login')
        }

        this.state = {
            user: props.location.state.user,
            showPopup: false,
            entries: props.location.state.entries,
            data: {
                labels: ['5.5.', '6.5.', '7.5.', '8.5.', '9.5.', '10.5.', '11.5.'],
                datasets: [
                  {
                    label: 'Your daily co2 score',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: [65, 59, 80, 81, 56, 55, 40]
                  }
                ]
            }
        }
    }

    componentDidMount() {
        
        Axios.get(URL + '/users/' + this.props.location.state.user.id)
            .then(user => {
                this.setDataState(user)
            })
    }

    setDataState = (user) => {
        const {data, entries} = this.state
        console.log(user)
        let modData = {...data}

        modData.labels = user.data.entries.map(entry => {
            let date = new Date(entry.date);
            return date.getDate() + "." + (date.getMonth() + 1) + "."
        })

        modData.datasets[0].data = user.data.entries.map(entry => {
            return entry.score
        })

        this.setState({user: user.data.user, data: modData})
    }

    handleClick = () => {
        this.setState({showPopup: !this.state.showPopup})
    }

    handleSave = () => {
        Axios.get(URL + '/users/' + this.state.user._id).then(user => {
            this.setDataState(user)
            this.handleClick()
        })
    }

    handleLogout = () => {
        this.props.history.push('/login')
    }

    render() {

        if(!this.props.location.state.user) {
            return <div>Loading...</div>
        }

        const {user, showPopup, data} = this.state;
        return (
            <div className="dashboardContainer">
                <div className="headerContainer">
                    <img src={Logo} />
                    <a onClick={this.handleLogout}>Logout</a>
                </div>
                <h1 className="welcomeMessage">{`Hi ${user.username}!`}</h1>
                <div className="infoContainer">
                    <div className="scoreContainer">
                        <h1>Your CO2 score:</h1>
                        <h1 className="scoreHeader">{user.score}</h1>
                    </div>
                    <div className="chartContainer">
                        <Bar
                            data={this.state.data}
                            options={{
                                maintainAspectRatio: false
                            }}
                        />
                    </div>
                </div>
                <button onClick={this.handleClick} className="button">Add Activity</button>
                {
                    showPopup ?
                    <AddActivityComponent email={user.email} save={this.handleSave} close={this.handleClick} />
                    :
                    <div></div>
                }
            </div>
        )
    }
}
