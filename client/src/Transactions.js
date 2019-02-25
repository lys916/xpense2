import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'
import { getTransactions } from './actions/transactionActions';
import { connect } from 'react-redux';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { deleteTransaction } from './actions/transactionActions';


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}

class Transactions extends Component {
  state = {
    open: false,
    id: null
  }
  componentDidMount(){
    console.log('transactions did mount');
    window.scrollTo(0, 0);
    if(this.props.transactions.length < 1){
      console.log('getting transactions');
      this.props.getTransactions(this.props.user._id);
    }
  }

  handleClickOpen = (id) => {
    this.setState({ open: true, id });
  };

  handleDelete = () => {
    this.props.deleteTransaction(this.state.id, this.props.history);
    this.handleClose();
  }

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes, transactions, user, others } = this.props;
    if(!this.props.user._id){
      this.props.history.push('/login');
      return null;
    }
    return (
      <div className={classes.root}>
        {this.props.transactions.length < 1 && !others.isLoading ? <div>There is no transaction</div>: 
        <div>
          {this.props.transactions.map((transaction, index)=>{
            return(
              <Card className={classes.card} >
                <CardContent className={classes.content} onClick={()=>{this.props.history.push(`/transaction/${transaction._id}`)}}> 
                  <div className={classes.title}>
                    {transaction.title}
                  </div>

                  <div className={classes.imageBox}>
                    {transaction.images.map(image=>{
                      return(
                        <img className={classes.img} src={image} />
                      )
                    })}
                  </div>

                  <div className={classes.desc}>
                    {transaction.desc}
                  </div>
                  <div className={classes.amount}>
                    ${transaction.amount}
                  </div>
                  <div className={classes.createdOn}>
                    Created on: {transaction.createdOn}
                  </div>
                        
                  <div className={classes.event}>
                    Event: {transaction.event.name}
                  </div> 
                </CardContent>
                  
                {/* </CardActionArea> */}
                <div className={classes.tray}>
                  <IconButton
                    color="default"
                    aria-label="Open drawer"
                    onClick={()=>{this.handleClickOpen(transaction._id)}}
                    className={classes.menuButton}
                  >
                    <Edit/>
                  </IconButton>
                  <IconButton
                    color="default"
                    aria-label="Open drawer"
                    onClick={()=>{this.handleClickOpen(transaction._id)}}
                    className={classes.menuButton}
                  >
                    <Delete/>
                  </IconButton>
                        
                </div>
              </Card>
            )
          })}
        </div>}

        
        <div className={classes.space}></div>
          <Fab color="primary" aria-label="Add" className={classes.fab} onClick={()=>{this.props.history.push('/create-transaction')}}>
            <AddIcon />
          </Fab>


          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
          <DialogTitle id="alert-dialog-title">{"Delete this transaction?"}</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleDelete} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    paddingTop: 70,
    paddingBottom: 80,
    background: '#f7f7f7'
  },
  card: {
    margin: '15px 10px',
  },
  content: {
    textAlign: 'left'
  },
  fab: {
    margin: theme.spacing.unit,
    position: 'fixed', 
    bottom: 70,
    right: 0
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  space: {
    height: 50
  },
  
  title: {
    fontSize: 20,
    paddingBottom: 10
  },
  desc: {
    paddingBottom: 13,
  },
  amount: {
    paddingBottom: 13,
    borderBottom: '1px solid #efefef',
    fontSize: 17
  },
  imageBox: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  img: {
    width: '23vw',
    height: '100%',
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 3
  },
  createdOn: {
    color: 'gray',
    paddingTop: 15,
    fontSize: 13
  },
   event: {
    color: 'gray',
    paddingTop: 10,
    fontSize: 13
  },
  tray: {
    borderTop: '1px solid #efefef',
    width: '100%',
    borderRadius: 3,
    display: 'flex',
    justifyContent: 'flex-end'
  }
});

const mapStateToProps = (state) => {
	return {
    transactions: state.transactions,
    user: state.user,
    others: state.others
  }
}

export default connect(mapStateToProps, {  getTransactions, deleteTransaction })(withStyles(styles)(Transactions));

