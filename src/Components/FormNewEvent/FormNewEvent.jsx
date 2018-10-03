import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import './FormNewEvent.sass';

class FormNewEvent extends Component{
    state = {
        day: '',
        month: '',
        year: '',
        hours: '',
        minutes: '',
        description: ''
    };
    

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    render(){
        return(
            <React.Fragment>
                <div className = 'form'>
                <div className = 'formdate'>
                    <TextField
                        id="outlined-name"
                        label="День"
                        value={this.state.day}
                        onChange={this.handleChange('day')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-name"
                        label="месяц"
                        value={this.state.month}
                        onChange={this.handleChange('month')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-name"
                        label="Год"
                        value={this.state.year}
                        onChange={this.handleChange('year')}
                        margin="normal"
                        variant="outlined"
                    />
                </div>

                <div className = 'formtime'>
                    <TextField
                        id="outlined-name"
                        label="Часы"
                        value={this.state.hours}
                        onChange={this.handleChange('hours')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-name"
                        label="минут"
                        value={this.state.minutes}
                        onChange={this.handleChange('minutes')}
                        margin="normal"
                        variant="outlined"
                    />
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