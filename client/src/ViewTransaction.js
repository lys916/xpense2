import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { deleteTransaction } from './actions/transactionActions';
import { withStyles } from '@material-ui/core/styles';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';


class ViewTransaction extends Component {

  handleDeleteTransaction =(id)=>{
    console.log(id);
    this.props.deleteTransaction(id, this.props.history);
  }

  render() {
    const pathStr = this.props.location.pathname;
    const pathArray = pathStr.split('/');
    const transactionIndex = pathArray[2];
    const {classes} = this.props;
    const transactions = this.props.transactions;
    if(transactions.length < 1){
      this.props.history.push('/transactions');
      return null;
    }

    return (
      <div className="CreateTransaction">
        <div className={classes.viewBar}>
          <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={()=>{this.handleDeleteTransaction(transactions[transactionIndex]._id)}}
              className={classes.menuButton}
            >
              <Delete/>
            </IconButton>
        </div>
        <Typography gutterBottom variant="h5" component="h2">
            {transactions[transactionIndex].title}
        </Typography>

        <Typography component="p">
            {transactions[transactionIndex].desc}
        </Typography>

        <div className={classes.imageBox}>
          {transactions[transactionIndex].images.map(image=>{
            return(
              <img className={classes.img} src={image} />
            )
          })}
            
        </div>

      </div>
    );
  }
}

const styles = theme => ({
  viewBar: {
    background: '#dedede',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  imageBox: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  img: {
    width: '40%',
    height: '100%',
    marginRight: 10
  }
});


const mapStateToProps = (state) => {
	return {
    transactions: state.transactions
  }
}

export default connect(mapStateToProps, {  deleteTransaction })(withStyles(styles)(ViewTransaction));
