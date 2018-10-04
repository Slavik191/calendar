import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './NewEventButton.sass';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  }
});



const NewEventButton = props => {
  const { classes } = props;

  let openModal = () => {
    props.openModal(null);
  }
  return (
    <div className = 'neweventbutton'>
      <Button className={classes.button} onClick = {openModal}>Добавить</Button>
    </div>
      
  );
}

NewEventButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewEventButton);