import React, { Component } from 'react';
import './Calendar.sass';
import left from './chevron-left.png';
import right from './chevron-right.png';
import CalendarDay from '../CalendarDay/CalendarDay';
import ChangeMode from '../ChangeMode/ChangeMode';
import AlertDialogSlide from '../AlertDialogSlide/AlertDialogSlide';
import NewEventButton from '../NewEventButton/NewEventButton';
import EventModal from '../EventModal/EventModal'

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
        annualEvents: {},
        modal: false,
        dateInfo: null,
        EventModalInfo: null,
        openEventModal: false
    }

    getNewEvent = (info, annual) => {
        for (let key in info) {
            if (`${info[key]}`.trim() === '') {
                alert('Заполните все поля');
                return false;
            }
        }
        if (info.startHours * 60 + +info.startMinutes > info.endHours * 60 + +info.endMinutes) {
            alert('Некорректное время');
            return false;
        }
        if (new Date(`${info.year}/${info.month}/${info.day}`).toString() === 'Invalid Date') {
            alert('Некорректная дата');
            return false;
        }
        if (new Date() > new Date(info.year, info.month - 1, info.day, info.startHours, info.startMinutes)) {
            alert('Вы указали прошедшую дату');
            return false;
        }
        this.closeModal();
        let intersection = false;
        let events;
        if (!annual) {
            events = this.state.events;
            if(events[`${info.year}`] !== undefined){
                if(events[`${info.year}`][`${info.month}`] !== undefined){
                    if(events[`${info.year}`][`${info.month}`][`${info.day}`] !== undefined){
                        if (events[`${info.year}`][`${info.month}`][`${info.day}`].length > 0) {
                            if(events[`${info.year}`][`${info.month}`][`${info.day}`] !== undefined){
                                events[`${info.year}`][`${info.month}`][`${info.day}`].forEach(event => {
                                    if (!(event.startHours * 60 + +event.startMinutes > info.endHours * 60 + +info.endMinutes || event.endHours * 60 + +event.endMinutes < info.startHours * 60 + +info.startMinutes))
                                        intersection = true
                                })
                            }
                        }
                    }
                }
            }
            if (this.state.annualEvents[`${info.month}`] !== undefined) {
                if(this.state.annualEvents[`${info.month}`][`${info.day}`] !== undefined){
                    this.state.annualEvents[`${info.month}`][`${info.day}`].forEach(event => {
                        if (!(event.startHours * 60 + +event.startMinutes > info.endHours * 60 + +info.endMinutes || event.endHours * 60 + +event.endMinutes < info.startHours * 60 + +info.startMinutes))
                            intersection = true
                    })
                }
            }

        }
        else {
            events = this.state.annualEvents;            
            if(events[`${info.month}`] !== undefined){
                if(events[`${info.month}`][`${info.day}`] !== undefined){
                    if (events[`${info.month}`][`${info.day}`].length > 0) {
                        events[`${info.month}`][`${info.day}`].forEach(event => {
                            if (!(event.startHours * 60 + +event.startMinutes > info.endHours * 60 + +info.endMinutes || event.endHours * 60 + +event.endMinutes < info.startHours * 60 + +info.startMinutes))
                                intersection = true
                        })
                    }
                }
            }
            if (this.state.events[`${info.year}`] !== undefined) {
                if (this.state.events[`${info.year}`][`${info.month}`] !== undefined) {
                    if(this.state.events[`${info.year}`][`${info.month}`][`${info.day}`] !== undefined){
                        this.state.events[`${info.year}`][`${info.month}`][`${info.day}`].forEach(event => {
                            if (!(event.startHours * 60 + +event.startMinutes > info.endHours * 60 + +info.endMinutes || event.endHours * 60 + +event.endMinutes < info.startHours * 60 + +info.startMinutes))
                                intersection = true
                        })
                    }
                }
            }
        }
        if (intersection ? window.confirm('Данное время уже занято...Всё равно добавить?') : true) {
            if (!annual) {
                if (events[`${info.year}`] === undefined)
                    events[`${info.year}`] = {};
                if (events[`${info.year}`][`${info.month}`] === undefined)
                    events[`${info.year}`][`${info.month}`] = {};
                if (events[`${info.year}`][`${info.month}`][`${info.day}`] === undefined)
                    events[`${info.year}`][`${info.month}`][`${info.day}`] = [];
                events[`${info.year}`][`${info.month}`][`${info.day}`].push({
                    day: info.day,
                    description: info.description,
                    endHours: info.endHours,
                    endMinutes: info.endMinutes,
                    month: info.month,
                    startHours: info.startHours,
                    startMinutes: info.startMinutes,
                    year: info.year
                })
                this.setState({
                    events: events
                })
            }
            else {
                if (events[`${info.month}`] === undefined)
                    events[`${info.month}`] = {};
                if (events[`${info.month}`][`${info.day}`] === undefined)
                    events[`${info.month}`][`${info.day}`] = [];
                events[`${info.month}`][`${info.day}`].push({
                    day: info.day,
                    description: info.description,
                    endHours: info.endHours,
                    endMinutes: info.endMinutes,
                    month: info.month,
                    startHours: info.startHours,
                    startMinutes: info.startMinutes,
                    year: info.year
                })
                this.setState({
                    annualEvents: events
                })
            }
        }

    }

    openModal = (arrDayInfo) => {
        this.setState({
            modal: true,
            dateInfo: arrDayInfo
        });
    }

    closeModal = () => {
        this.setState({
            modal: false
        });
    }

    openEventModal = (infoEvent) => {
        this.setState({
            openEventModal: true,
            EventModalInfo: infoEvent
        });
    }

    exitEventModal = () => {
        this.setState({
            openEventModal: false
        });
    }

    activateAdvancedMode = () => { this.setState({ advancedMode: !this.state.advancedMode }); }

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
        let eventsMonth;
        let annualEventsMonth;
        let startDay = this.state.date.startDay();
        let daysInMonth = this.state.date.daysInMonth();
        if (this.state.events[`${this.state.date.getYear() + 1900}`] !== undefined) {
            eventsMonth = this.state.events[`${this.state.date.getYear() + 1900}`][`${this.state.date.getMonth() + 1}`]
        }
        annualEventsMonth = this.state.annualEvents[`${this.state.date.getMonth() + 1}`]
        for (let i = 1; i <= daysInMonth + startDay - 1; i++) {
            if (i >= startDay) {
                let eventsDay;
                if (eventsMonth !== undefined)
                    eventsDay = eventsMonth[`${i - (startDay - 1)}`];
                if (annualEventsMonth !== undefined) {
                    if (annualEventsMonth[`${i - (startDay - 1)}`] !== undefined) {
                        if (eventsDay === undefined)
                            eventsDay = [];
                        if (annualEventsMonth[`${i - (startDay - 1)}`][0].year <= this.state.date.getYear() + 1900)
                            eventsDay.push(...annualEventsMonth[`${i - (startDay - 1)}`])
                    }
                }
                
                
                if (eventsDay !== undefined) {
                    for (let i = 0; i < eventsDay.length - 1; i++) {
                        if (eventsDay[i].startHours * 60 + +eventsDay[i].startMinutes > eventsDay[i + 1].startHours * 60 + +eventsDay[i + 1].startMinutes) {
                            let vrem = eventsDay[i];
                            eventsDay[i] = eventsDay[i + 1];
                            eventsDay[i + 1] = vrem;
                        }
                    }
                    eventsDay = [ ...new Set(eventsDay)]
                }
                

                items.push(<CalendarDay
                    day={i - (startDay - 1)}
                    month={this.state.date.getMonth() + 1}
                    year={this.state.date.getYear() + 1900}
                    key={i - (startDay - 1)}
                    advancedMode={this.state.advancedMode}
                    ref={(calendarDay) => { this.calendarDay = calendarDay; }}
                    openModal={this.openModal}
                    eventsDay={eventsDay}
                    openEventModal={this.openEventModal}
                />)
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
        return (
            <React.Fragment>
                <EventModal exitEventModal={this.exitEventModal} EventModalInfo={this.state.EventModalInfo} open={this.state.openEventModal} />
                <AlertDialogSlide open={this.state.modal} closeModal={this.closeModal} getNewEvent={this.getNewEvent} dateInfo={this.state.dateInfo} />
                <div className='calendarcontainer'>
                    <div className='calendarnavigation'>
                        <NewEventButton openModal={this.openModal} />
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
                        <ChangeMode activateAdvancedMode={this.activateAdvancedMode} />
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
