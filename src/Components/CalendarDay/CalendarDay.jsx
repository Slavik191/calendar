import React, { Component } from 'react';
import './CalendarDay.sass';


class CalendarDay extends Component{
    state = {
        day: this.props.day !== undefined ? true : false,
        modal: false
    }

    infoDay = () => {
    }

    render(){
        return(
                <div className = 'calendarday' onClick = {this.props.openModal}>
                    {this.state.day && <div className = {this.props.advancedMode ? ' numbersadvancedMode'  : 'numbers' }>{this.props.day}</div>}                
                </div>
        )
    }
}

export default CalendarDay;

