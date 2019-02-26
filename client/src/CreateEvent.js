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
    desc: '',
    error: null
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value, error: '' });
  };

  createEvent = ()=>{
    const { name, budget, coord, desc } = this.state;
    if(name === ''){
      this.setState({error: 'event name'});
    }else if(budget === ''){
      this.setState({error: 'budget'});
    }

    else if(budget !== ''){
      const isnum = /^\d+$/.test(budget);
      if(!isnum){
        this.setState({error: 'budgetNotNumber'});
      }
      else if(coord === ''){
        this.setState({error: 'coord'});
      }
      else if(desc === ''){
        this.setState({error: 'desc'});
      }else{
        const {name, budget, coord, desc} = this.state;
        this.props.createEvent({name, budget, coord, desc}, this.props.history);
      }
    }
  }

  render() {
    const {classes} = this.props;
    const {error} = this.state;
    return (
      <div className="CreateEvent">
        <br/><br/><br/>
        <form className={classes.container} noValidate autoComplete="off">
        
          {error === 'event name' ? <div className={classes.formError}>Name is required.</div>:<div className={classes.formError}></div>}
          <TextField
            id="outlined-name"
            label="Event name*"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
            variant="outlined"
          />

          {error === 'budget' ? <div className={classes.formError}>Budget is required.</div>:<div className={classes.formError}></div>}

          {error === 'budgetNotNumber' ? <div className={classes.formError}>Budget must be a number (0 or more).</div>:<div className={classes.formError}></div>}

          <TextField
            id="outlined-name"
            label="Event budget*"
            className={classes.textField}
            value={this.state.budget}
            onChange={this.handleChange('budget')}
            margin="normal"
            variant="outlined"
          />

          {error === 'coord' ? <div className={classes.formError}>Coordinator is required.</div>:<div className={classes.formError}></div>}
          <TextField
            id="outlined-name"
            label="Event coordinator*"
            className={classes.textField}
            value={this.state.coord}
            onChange={this.handleChange('coord')}
            margin="normal"
            variant="outlined"
          />

          {error === 'desc' ? <div className={classes.formError}>Description is required.</div>:<div className={classes.formError}></div>}
          <TextField
            id="outlined-name"
            label="Event description*"
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
    // marginBottom: 0,
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
  formError: {
    color: 'red',
    marginLeft: 10,
    fontSize: 12,
    height: 1,
  }
});

const mapStateToProps = (state) => {
	return {
  }
}

export default connect(mapStateToProps, {  createEvent })(withStyles(styles)(CreateEvent));

