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

    componentDidMount(){
    if(this.props.transactions.length < 1){
      this.props.getTransactions();
    }
  }
  render() {
    const { classes, transactions } = this.props;
    console.log('transactions', this.props.transactions);

    return (
      <div className="Event">
        {this.props.transactions.length < 1 ? <div>There is no transaction</div>: 
        <div>
          {this.props.transactions.map((transaction, index)=>{
            return(
                <Card className={classes.card} onClick={()=>{this.props.history.push(`/transaction/${index}`)}}>
                <CardActionArea>
                  <CardContent>
                    <div className={classes.createdBy}>Created By: {transaction.createdBy} On: {transaction.createdOn}</div>
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

                  </CardContent>
                </CardActionArea>
              </Card>
            )
          })}
        </div>}

        
        <div className={classes.space}></div>
          <Fab color="primary" aria-label="Add" className={classes.fab} onClick={()=>{this.props.history.push('/create-transaction')}}>
            <AddIcon />
          </Fab>
      </div>
    );
  }
}

const styles = theme => ({
  card: {
    marginBottom: 10
  },
  fab: {
    margin: theme.spacing.unit,
    position: 'fixed', 
    bottom: 0,
    right: 0
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  space: {
    height: 50
  },
  createdBy: {
  },
  imageBox: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  img: {
    height: '20%',
    marginRight: 10
  },
});

const mapStateToProps = (state) => {
	return {
    transactions: state.transactions
  }
}

export default connect(mapStateToProps, {  getTransactions })(withStyles(styles)(Transactions));

