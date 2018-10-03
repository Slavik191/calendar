import React, { Component } from 'react';
import './Calendar.sass';
import left from './chevron-left.png';
import right from './chevron-right.png';
import CalendarDay from '../CalendarDay/CalendarDay';
import ChangeMode from '../ChangeMode/ChangeMode';
import AlertDialogSlide from '../AlertDialogSlide/AlertDialogSlide';

Date.prototype.daysInMonth = function () {
    return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
};

Date.prototype.startDay = function () {
    let day = new Date(this.getFullYear(), this.getMonth(), 1).getDay()
    return day === 0 ? 7 : day;
};

class Calendar extends Component {


    state = {
        date: new Date(),
        advancedMode: false,
        events: {},
        modal: false
    }

    getNewEvent = (info) => {
        if(String(new Date(`${info.year}/${info.month}/${info.day}`))  !== 'Invalid Date'){       
            let events = this.state.events;
            if(events[`${info.year}`] ===undefined)
                events[`${info.year}`] = {};
            if(events[`${info.year}`][`${info.month}`] ===undefined)
                events[`${info.year}`][`${info.month}`] = {};
            if(events[`${info.year}`][`${info.month}`][`${info.day}`] ===undefined)
                events[`${info.year}`][`${info.month}`][`${info.day}`] = [];  
            
            events[`${info.year}`][`${info.month}`][`${info.day}`].push({hours: info.hours, minutes: info.minutes, description: info.description})
            this.setState({
                events: events
            })
        }
    }

    openModal = () => {
        this.setState({
            modal: true
        });
    }

    closeModal = () => {
        this.setState({
            modal: false
        });
    }

    activateAdvancedMode = () => {this.setState({ advancedMode: !this.state.advancedMode });}

    nextmounth = () => {
        let date = this.state.date;
        date.setMonth(date.getMonth() + 1);
        this.setState({
            date: date
        })
    }

    previousmounth = () => {
        let date = this.state.date;
        date.setMonth(date.getMonth() - 1);
        this.setState({
            date: date,
            checkedA: true
        })
    }


    items = () => {
        let items = [];
        let startDay = this.state.date.startDay();
        let daysInMonth = this.state.date.daysInMonth();
        for (let i = 1; i <= daysInMonth + startDay - 1; i++) {
            if (i >= startDay) {
            
                items.push(<CalendarDay day={i - (startDay - 1)} key = {i - (startDay - 1)} advancedMode = {this.state.advancedMode} ref={(calendarDay) => {this.calendarDay = calendarDay;}} openModal = {this.openModal}/>)
            }
            else {
                items.push(<CalendarDay key={i + 50} />)
            }
        }
        let finishDays;
        items.length % 7 !== 0 ? finishDays = items.length % 7 : finishDays = 0;
        if (finishDays !== 0) {
            for (let i = 1; i <= 7 - finishDays; i++) {
                items.push(<CalendarDay key={i + 100} />)
            }
        }
        return items;
    }

    render() {
        console.log(this.state.events)
        return (
            <React.Fragment>
                <AlertDialogSlide open = {this.state.modal} closeModal = {this.closeModal} getNewEvent = {this.getNewEvent}/>
                <div className='calendarcontainer'>
                    <div className='calendarnavigation'>
                        <div className='monthandyear'>
                            <img src={left} onClick={this.previousmounth} />
                            <div className='monthandyeartext'>
                                {this.state.date.toLocaleString('ru', {
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </div>
                            <img src={right} onClick={this.nextmounth} />
                        </div>
                        <ChangeMode  activateAdvancedMode = {this.activateAdvancedMode}/>
                    </div>
                    <div className='calendarbody'>
                        <div className='week'>
                            <div className='nameday'>Понедельник</div>
                            <div className='nameday'>Вторник</div>
                            <div className='nameday'>Среда</div>
                            <div className='nameday'>Четверг</div>
                            <div className='nameday'>Пятница</div>
                            <div className='nameday'>Суббота</div>
                            <div className='nameday'>Воскресенье</div>
                        </div>
                        <div className='calendardays'>
                            {this.items()}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


export default Calendar;
