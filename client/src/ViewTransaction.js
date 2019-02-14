import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { deleteTransaction } from './actions/transactionActions';
import { withStyles } from '@material-ui/core/styles';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';

class ViewTransaction extends Component {

  state = {
    transaction: {images: []}
  }

  componentDidMount(){
    const { id } = this.props.match.params;
    console.log('got id', id);
    axios.get(`/transaction/${id}`).then(res => {
      console.log('got a transaction', res.data);
      this.setState({transaction: res.data});
    });
  }

  handleDeleteTransaction =(id)=>{
    console.log(id);
    this.props.deleteTransaction(id, this.props.history);
  }

  render() {
    // const pathStr = this.props.location.pathname;
    // const pathArray = pathStr.split('/');
    // const transactionIndex = pathArray[2];
    const {classes} = this.props;
    const {transaction} = this.state;
    // if(transactions.length < 1){
    //   this.props.history.push('/transactions');
    //   return null;
    // }

    return (
      <div className={classes.root}>

        <div className={classes.viewBar}>
          <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={()=>{this.handleDeleteTransaction(transaction._id)}}
              className={classes.menuButton}
            >
              <Delete/>
            </IconButton>
        </div>

        <Typography gutterBottom variant="h5" component="h2">
            {transaction.title}
        </Typography>

        <Typography component="p">
            {transaction.desc}
        </Typography>

        <div className={classes.imageBox}>
          {transaction.images.map(image=>{
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
  root: {
    paddingTop: 70
  },
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
