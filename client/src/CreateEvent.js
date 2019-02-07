import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';


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
    const { name, budget, coord, desc } = this.state;
    console.log('creating event');
    axios.post('/user', {name, budget, coord, desc}).then(res=>{
      this.setState({
        users: res.data
      })
    });
  }

  render() {
    const {classes} = this.props;
    return (
      <div className="CreateEvent">
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

        <Button variant="contained" color="primary" className={classes.button}onClick={this.createEvent} >
          Create Event
        </Button>
        
      </div>
    );
  }
}

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  },
  textArea: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    width: '100%'
  },
});




export default withStyles(styles)(CreateEvent);
