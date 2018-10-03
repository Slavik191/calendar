import React, { Component } from 'react';
import Switch from '@material-ui/core/Switch';
import './ChangeMode.sass'

class ChangeMode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cheked: false
        }
    }

    handleChange = name => event => {
        this.props.activateAdvancedMode()
        this.setState({ cheked: !this.state.cheked });
    };

    render() {
        return (
            <div className = 'switch'>
                <Switch
                    checked={this.state.checked}
                    onChange={this.handleChange()}
                />
            </div>
        )
    }
}

export default ChangeMode;