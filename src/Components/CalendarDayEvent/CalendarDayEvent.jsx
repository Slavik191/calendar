import React, { Component } from 'react';
import './CalendarDayEvent.sass'



const CalendarDayEvent = (props, contex) => {
    return (
        <div className = {props.advancedMode ? 'advancedmodeevent' : 'advancedmodeevent event'}>{props.event.description.length > 12 ? `${props.event.description.slice(0, 10)}..` : props.event.description}</div>
    )
}

export default CalendarDayEvent;