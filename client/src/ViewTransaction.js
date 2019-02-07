import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';


// evetns array should be coming from database
const transactions = [
  {name: 'Transactions 1', desc: 'Transactions 1 description'},
  {name: 'Transactions 2', desc: 'Transactions 2 description'},
  {name: 'Transactions 3', desc: 'Transactions 3 description'},
  {name: 'Transactions 4', desc: 'Transactions 4 description'},
  {name: 'Transactions 5', desc: 'Transactions 5 description'}
];

class ViewEvent extends Component {
  render() {
    const pathStr = this.props.location.pathname;
    const pathArray = pathStr.split('/');
    const transactionIndex = pathArray[2];
    console.log('index', transactionIndex);
    return (
      <div className="CreateTransaction">
        <Typography gutterBottom variant="h5" component="h2">
            {transactions[transactionIndex].name}
        </Typography>

        <Typography component="p">
            {transactions[transactionIndex].desc}
        </Typography>
      </div>
    );
  }
}
export default ViewEvent;
