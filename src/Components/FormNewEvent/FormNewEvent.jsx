import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import './FormNewEvent.sass';

class FormNewEvent extends Component{
    state = {
        day: '',
        month: '',
        year: '',
        startHours: '',
        startMinutes: '',
        endHours: '',
        endMinutes: '',
        description: ''
    };

    componentWillUpdate(nextProps){
        if(nextProps !== this.props){
            this.setState({
                day: nextProps.dateInfo !== null ? nextProps.dateInfo[0] : '',
                month: nextProps.dateInfo !== null ? nextProps.dateInfo[1] : '',
                year: nextProps.dateInfo !== null ? nextProps.dateInfo[2] : '',
                startHours: '',
                startMinutes: '',
                endHours: '',
                endMinutes: '',
                description: ''
            })
        }
    }
    

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleChangeTime = name => event => {
        let change = false;
        if(name.indexOf('Hours') !== -1){
            if(event.target.value.length < 3 && +event.target.value < 24)
            change = true;
        }
        if(name.indexOf('Minutes') !== -1){
            if(event.target.value.length < 3 && +event.target.value < 60)
            change = true;
        }
        if(change){
            this.setState({
                [name]: event.target.value,
            });
        }
    };


    handleChangeDate = name => event => {
        let change = false;
        if(name.indexOf('day') !== -1){
            if(event.target.value.length < 3 && +event.target.value < 32)
            change = true;
        }
        if(name.indexOf('month') !== -1){
            if(event.target.value.length < 3 && +event.target.value < 13)
            change = true;
        }
        if(name.indexOf('year') !== -1){
            if(event.target.value.length < 5)
            change = true;
        }
        if(change){
            this.setState({
                [name]: event.target.value,
            });
        }
    };

    render(){
        return(
            <React.Fragment>
                <div className = 'form'>
                <div className = 'formdate'>
                    <TextField
                        id="outlined-name"
                        label="Число"
                        value={this.state.day}
                        onChange={this.handleChangeDate('day')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-name"
                        label="месяц"
                        value={this.state.month}
                        onChange={this.handleChangeDate('month')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-name"
                        label="Год"
                        value={this.state.year}
                        onChange={this.handleChangeDate('year')}
                        margin="normal"
                        variant="outlined"
                    />
                </div>

                <div className = 'formtime'>
                    <div>
                        <span>С</span>
                        <TextField
                            id="outlined-name"
                            label="Часы"
                            value={this.state.startHours}
                            onChange={this.handleChangeTime('startHours')}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-name"
                            label="минуты"
                            value={this.state.startMinutes}
                            onChange={this.handleChangeTime('startMinutes')}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div>
                        <span>ДО</span>
                        <TextField
                            id="outlined-name"
                            label="Часы"
                            value={this.state.endHours}
                            onChange={this.handleChangeTime('endHours')}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-name"
                            label="минуты"
                            value={this.state.endMinutes}
                            onChange={this.handleChangeTime('endMinutes')}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                </div>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Описание"
                    multiline
                    rows = '4'
                    rowsMax="4"
                    value={this.state.description}
                    onChange={this.handleChange('description')}
                    margin="normal"
                    variant="outlined"
                />
                </div>

            </React.Fragment>
        )
    }
}

export default FormNewEvent;