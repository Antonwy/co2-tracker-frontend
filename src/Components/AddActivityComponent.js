import React, { Component } from 'react'
import Axios from 'axios';
import { URL } from '../Constants';

export default class AddActivityComponent extends Component {

    state = {
        selection: 0,
        inputSelect: 0,
        selectedSize: 0,
        selectedDrive: 0,
        typeID: 0,
        distance: undefined
    }

    handleClick = (event) => () => {
        this.setState({selection: event})
    }

    handleSelectionChange = (event) => {
        this.setState({inputSelect: parseInt(event.target.value)})
    }

    handleRadioSizeChange = (event) => {
        this.setState({selectedSize: parseInt(event.target.value)})
    }

    handleRadioDriveChange = (event) => {
        this.setState({selectedDrive: parseInt(event.target.value)})
    }

    handleAddClick = () => {
        const {inputSelect, selectedSize, selectedDrive} = this.state
        var tempType = 0
        if(inputSelect === 0) {
            switch (selectedSize) {
                case 0:
                    switch (selectedDrive) {
                        case 0:
                            tempType = 1
                            break;
                        case 1:
                            tempType = 4
                            break;
                        case 2:
                            tempType = 7
                            break;
                    }
                    break;
                case 1:
                    switch (selectedDrive) {
                        case 0:
                            tempType = 2
                            break;
                        case 1:
                            tempType = 5
                            break;
                        case 2:
                            tempType = 8
                            break;
                    }
                    break;
                case 2:
                    switch (selectedDrive) {
                        case 0:
                            tempType = 3
                            break;
                        case 1:
                            tempType = 6
                            break;
                        case 2:
                            tempType = 9
                            break;
                    }
                    break;
            }
            this.setState({typeID: tempType}, this.saveActivity)
        }else {
            this.setState({typeID: inputSelect}, this.saveActivity)
        }
    }

    saveActivity = () => {
        const {typeID, distance} = this.state

        if(!distance) {return}

        Axios.post(URL + '/entry/add', {
            typeID, 
            amount: distance,
            email: this.props.email
        }).then(data => {
            console.log(data)
            this.props.save()
        }).catch(err => {
            console.log(err.response)
        })
    }

    handleDistanceChange = (event) => {
        this.setState({
            distance: parseInt(event.target.value)
        })
    }

    renderSelection = () => {
        switch (this.state.selection) {
            case 0:
                return (
                    <div className="selectionContainer">
                        <h1>Add your Activty</h1>
                        <div onClick={this.handleClick(1)} className="green">Transportation</div>
                        <div className="red">Consumption</div>
                    </div>
                )
            case 1: 
                return (
                    <div className="selectionContainer2">
                        <h1>Choose your transportation method:</h1>
                        <select onChange={this.handleSelectionChange} name="transportationMethod">
                            <option value="0" defaultChecked>Auto</option>
                            <option value="10">Plane</option>
                            <option value="11">Train</option>
                            <option value="12">Bus</option>
                            <option value="13">Bike</option>
                            <option value="14">Walk</option>
                        </select>
                        {
                            this.state.inputSelect === 0 ?
                            <div className="autoSelection">
                                <p>Size:</p>
                                <form onChange={this.handleRadioSizeChange}>
                                    <input type="radio" name="size" value="0" defaultChecked/> Small<br></br>
                                    <input type="radio" name="size" value="1"/> Medium<br></br>
                                    <input type="radio" name="size" value="2"/> Large<br></br>
                                </form> 
                                <p>Drive: </p>
                                <form onChange={this.handleRadioDriveChange}>
                                    <input type="radio" name="drive" value="0" defaultChecked/> Diesel<br></br>
                                    <input type="radio" name="drive" value="1"/> Benzin<br></br>
                                    <input type="radio" name="drive" value="2"/> Electro<br></br>
                                </form>
                            </div>
                            :
                            <div>
                            </div>
                        } 
                        <input onChange={this.handleDistanceChange} type="number" className="distanceInput" placeholder="Distance in km" />
                    </div>
                )
            default:
                break;
        }
    }

    render() {
        return (
            <div className="addActivityContainer">
                <svg onClick={this.props.close} width="35" height="35" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                {this.renderSelection()}
                { this.state.selection === 1 ? <button className="button black" onClick={this.handleAddClick}>Add Activity</button> : <div></div>}
            </div>
        )
    }
}
