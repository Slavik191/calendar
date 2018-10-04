import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class EventModal extends Component {
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
                        {this.props.EventModalInfo !== null ? `Событие ${this.props.EventModalInfo.day}.${this.props.EventModalInfo.month}.${this.props.EventModalInfo.year} (${this.props.EventModalInfo.startHours}:${this.props.EventModalInfo.startMinutes}-${this.props.EventModalInfo.endHours}:${this.props.EventModalInfo.endMinutes})` : ''}
                    </DialogTitle>
                    <DialogContent>  
                        {this.props.EventModalInfo !== null ? this.props.EventModalInfo.description : ''}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.exitEventModal} color="primary">
                            Закрыть
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default EventModal;