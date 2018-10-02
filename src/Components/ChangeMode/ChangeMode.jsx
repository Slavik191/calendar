import React, { Component } from 'react';
import Switch from '@material-ui/core/Switch';

class ChangeMode extends Component {

    constructor(props){
        super(props);
        this.state = {
            chekedA: false
        }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
      };

    render(){
        return (
            <Switch
                checked={this.state.checkedA}
                onChange={this.handleChange()}
                value="checkedA"
            />
        )
    }
}

export default ChangeMode;