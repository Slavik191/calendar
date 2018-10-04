import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import FormNewEvent from '../FormNewEvent/FormNewEvent.jsx';
import AnnualForm from '../AnnualForm/AnnualForm';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class AlertDialogSlide extends Component {
    giveNewEvent = () => {
        this.props.getNewEvent(this.formNewEvent.state, this.annualForm.state.checked);
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {"ДОБАВИТЬ СОБЫТИЕ"}
                        <AnnualForm ref = {annualForm => this.annualForm = annualForm}/>
                    </DialogTitle>
                    <DialogContent>
                        
                        <FormNewEvent getNewEvent = {this.props.getNewEvent} ref = {formNewEvent => this.formNewEvent = formNewEvent} dateInfo = {this.props.dateInfo}/>
                   
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.closeModal} color="primary">
                            Отмена
            </Button>
                        <Button onClick={this.giveNewEvent} color="primary">
                            Создать
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AlertDialogSlide;