import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';



class CreateEvent extends Component {
  state = {
    name: ''
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value });
  };

  render() {
    const {classes} = this.props;
    return (
      <div className="CreateEvent">
        <form className={classes.container} noValidate autoComplete="off">
          
          <TextField
            id="outlined-name"
            label="Name"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
            variant="outlined"
          />
          
        </form>
      </div>
    );
  }
}

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});




export default withStyles(styles)(CreateEvent);
