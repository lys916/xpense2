import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'
import { getUsers } from './actions/userActions';
import { connect } from 'react-redux';

class Users extends Component {
  componentDidMount(){
    window.scrollTo(0, 0);
    if(this.props.users.length < 1){
      this.props.getUsers();
    }
  }
  render() {
    const { classes, users, transactions } = this.props;
    console.log('user list', users);
    if(!this.props.user._id){
      this.props.history.push('/login');
      return null;
    }
    return (
      <div className={classes.root}>
        {this.props.users.length < 1 ? <div>There is no user</div>: 
        <div>
          {users.map((user, index)=>{
            return(
                <Card className={classes.card} onClick={()=>{this.props.history.push(`/user/${user._id}`)}}>
                  <CardContent className={classes.content}>
                    {user.name}
                   
                  </CardContent>
              </Card>
            )
          })}
        </div>}
        <div className={classes.space}></div>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    paddingTop: 70,
    paddingBottom: 80,
    background: '#efefef'
  },
  card: {
    margin: 10,
  },
  content: {
    textAlign: 'left'
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  space: {
    height: 50
  },
});

const mapStateToProps = (state) => {
	return {
    transactions: state.transactions,
    user: state.user,
    others: state.others,
    users: state.users
  }
}

export default connect(mapStateToProps, {  getUsers })(withStyles(styles)(Users));

