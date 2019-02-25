import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import axios from 'axios';
import { createEvent } from './actions/eventActions';

class CreateEvent extends Component {
  state = {
    name: '',
    budget: '',
    coord: '',
    desc: ''
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value });
  };

  createEvent = ()=>{
    const {name, budget, coord, desc} = this.state;
    this.props.createEvent({name, budget, coord, desc}, this.props.history);
  }

  render() {
    const {classes} = this.props;
    return (
      <div className="CreateEvent">
        <br/><br/><br/>
        <form className={classes.container} noValidate autoComplete="off">
          
          <TextField
            id="outlined-name"
            label="Event Name"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="outlined-name"
            label="Event Budget"
            className={classes.textField}
            value={this.state.budget}
            onChange={this.handleChange('budget')}
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="outlined-name"
            label="Event Coordinator"
            className={classes.textField}
            value={this.state.coord}
            onChange={this.handleChange('coord')}
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="outlined-name"
            label="Event Description"
            className={classes.textArea}
            value={this.state.desc}
            onChange={this.handleChange('desc')}
            margin="normal"
            variant="outlined"
            multiline={true}
            rows={4}
          />
          
        </form>

        <Button variant="contained" color="primary" className={classes.createButton}onClick={this.createEvent} >
          Create Event
        </Button>
        <br/><br/>
      </div>
    );
  }
}

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
    marginBottom: 0,
    background: 'white'
  },
  textArea: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
    background: 'white'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  createButton: {
    marginBottom: 70,
    width: '95%',
    marginTop: 10,
  },
});

const mapStateToProps = (state) => {
	return {
  }
}

export default connect(mapStateToProps, {  createEvent })(withStyles(styles)(CreateEvent));

