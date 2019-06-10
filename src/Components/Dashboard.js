import React, { Component } from 'react'
import Axios from 'axios';
import { URL } from '../Constants';
import AddActivityComponent from './AddActivityComponent';
import { Bar, Pie } from 'react-chartjs-2';
import Logo from '../Media/Logo.png'

export default class Dashboard extends Component {


    constructor(props) {
        super(props)

        console.log(props)
        if(!props.location.state) {
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
            },
            pieData: {
                labels: [
                    'Red',
                    'Green',
                    'Yellow'
                ],
                datasets: [{
                    data: [300, 50, 100],
                    backgroundColor: [
                        '#247BA0',
                        '#70C1B3',
                        '#B2DBBF',
                        '#F3FFBD',
                        '#FF1654',
                        '#FFCDB2',
                        '#FFB4A2',
                        '#E5989B',
                        '#B5838D',
                        '#6D6875',
                        '#2B2D42',
                        '#8D99AE',
                        '#EDF2F4',
                        '#D90429',
                    ],
                    hoverBackgroundColor: [
                        '#247BA0',
                        '#70C1B3',
                        '#B2DBBF',
                        '#F3FFBD',
                        '#FF1654',
                        '#FFCDB2',
                        '#FFB4A2',
                        '#E5989B',
                        '#B5838D',
                        '#6D6875',
                        '#2B2D42',
                        '#8D99AE',
                        '#EDF2F4',
                        '#D90429',
                    ]
                }]
            }
        }
    }

    componentDidMount() {
        if(!this.props.location.state) return
        Axios.get(URL + '/users/' + this.props.location.state.user.id)
            .then(user => {
                this.setDataState(user)
            })
    }

    setDataState = (user) => {
        const {data, pieData} = this.state
        console.log(user)
        let modData = {...data}
        let modPieData = {...pieData}

        modData.labels = user.data.entries.map(entry => {
            let date = new Date(entry.date);
            return date.getDate() + "." + (date.getMonth() + 1) + "."
        })

        modData.datasets[0].data = user.data.entries.map(entry => {
            return entry.score
        })

        modPieData.labels = user.data.pieData.map(pieData => (
            pieData.name
        ))

        modPieData.datasets[0].data = user.data.pieData.map(pieData => (
            pieData.amount
        ))

        this.setState({user: user.data.user, data: modData, pieData: modPieData})
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

        if(!this.props.location.state) {
            return <div>Loading...</div>
        }

        const {user, showPopup, data, pieData} = this.state;
        return (
            <div className="dashboardContainer">
                <div className="headerContainer">
                    <img src={Logo} />
                    <a onClick={this.handleLogout}>Logout</a>
                </div>
                <h1 className="welcomeMessage">{`Hi ${user.username}!`}</h1>
                <div className="infoContainer">
                    <div className="scoreContainer">
                        <h2>Your CO2 score:</h2>
                        <h1 className="scoreHeader">{user.score}</h1>
                        <button onClick={this.handleClick} className="addActivityBtn button">Add Activity</button>
                    </div>
                    <div className="chartContainer">
                        <div>
                            <h2>Last 7 days:</h2>
                            <div className="barContainer">
                                <Bar
                                    data={data}
                                    options={{
                                        maintainAspectRatio: false
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <h2>Transportation method:</h2>
                            <div className="pieContainer">
                                <Pie data={pieData} />
                            </div>
                        </div>
                    </div>
                </div>
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
