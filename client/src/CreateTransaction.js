import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import axios from 'axios';
import { createTransaction } from './actions/transactionActions';



class CreateTransaction extends Component {
  state = {
    title: '',
    amount: '',
    desc: ''
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value });
  };

  createTransaction = ()=>{
    const {title, amount, desc} = this.state;
    this.props.createTransaction({title, amount, desc}, this.props.history);
  }

  render() {
    const {classes} = this.props;
    return (
      <div className="CreateTransaction">
        <form className={classes.container} noValidate autoComplete="off">
          
          <TextField
            id="outlined-name"
            label="Title"
            className={classes.textField}
            value={this.state.title}
            onChange={this.handleChange('title')}
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="outlined-name"
            label="Amount"
            className={classes.textField}
            value={this.state.amount}
            onChange={this.handleChange('amount')}
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

        <Button variant="contained" color="primary" className={classes.button}onClick={this.createTransaction} >
          Create Transaction
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

const mapStateToProps = (state) => {
	return {
  }
}

export default connect(mapStateToProps, {  createTransaction })(withStyles(styles)(CreateTransaction));

