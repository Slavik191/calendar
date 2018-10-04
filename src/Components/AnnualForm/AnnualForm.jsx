import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import './AnnualForm.sass'

class AnnualForm extends Component {
    state = {
        checked: false,
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };


    render() {

        return (
            <div className = 'annualform'>
                <FormControlLabel
                    labelPlacement="start"
                    label="Повторять ежегодно"
                    control={
                        <Checkbox
                            checked={this.state.checked}
                            onChange={this.handleChange('checked')}
                            value="checked"
                        />
                    }
                />
            </div>
        )
    }

}


export default AnnualForm;