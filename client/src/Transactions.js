import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'

// transactions arrasy should be coming from the database
const transactions = [
  {name: 'Transactions 1', desc: 'Transactions 1 description'},
  {name: 'Transactions 2', desc: 'Transactions 2 description'},
  {name: 'Transactions 3', desc: 'Transactions 3 description'},
  {name: 'Transactions 4', desc: 'Transactions 4 description'},
  {name: 'Transactions 5', desc: 'Transactions 5 description'}
];

class Transactions extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="Event">
        {transactions.map((transaction, index)=>{
          return(
              <Card className={classes.card} onClick={()=>{this.props.history.push(`/transaction/${index}`)}}>
              <CardActionArea>
                <CardContent>

                  <Typography gutterBottom variant="h5" component="h2">
                    {transaction.name}
                  </Typography>

                  <Typography component="p">
                    {transaction.desc}
                  </Typography>

                </CardContent>
              </CardActionArea>
            </Card>
          )
        })}
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
  }
});

export default withStyles(styles)(Transactions);
