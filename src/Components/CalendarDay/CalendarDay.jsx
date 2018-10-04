import React, { Component } from 'react';
import CalendarDayEvent from '../CalendarDayEvent/CalendarDayEvent';
import './CalendarDay.sass';


class CalendarDay extends Component{
    state = {
        day: this.props.day !== undefined ? true : false,
        modal: false
    }


    render(){
        let eventsDay;
        if(this.props.eventsDay !== undefined){
            eventsDay = this.props.eventsDay.map(event => {
                return <CalendarDayEvent event = {event} advancedMode = {this.props.advancedMode}/>  
            })
        }
        return(
                <div className = 'calendarday' onClick = {this.props.openModal}>
                    {this.state.day && <div className = {this.props.advancedMode ? ' numbersadvancedMode'  : 'numbers' }>{this.props.day}</div>} 
                    <div className = 'eventsday'>{eventsDay}</div>            
                </div>
        )
    }
}

export default CalendarDay;

