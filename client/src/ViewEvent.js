import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { deleteEvent } from './actions/eventActions';
import { withStyles } from '@material-ui/core/styles';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';

class ViewEvent extends Component {

  state = {
    event: {}
  }

  componentDidMount(){
    const { id } = this.props.match.params;
    // console.log('got id', id);
    axios.get(`/event/${id}`).then(res => {
      // console.log('got a event', res.data);
      this.setState({event: res.data});
    });
  }

  handleDeleteEvent =(id)=>{
    console.log(id);
    this.props.deleteEvent(id, this.props.history);
  }

  render() {
    // const pathStr = this.props.location.pathname;
    // const pathArray = pathStr.split('/');
    // const transactionIndex = pathArray[2];
    const {classes} = this.props;
    const {event} = this.state;
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
              onClick={()=>{this.handleDeleteEvent(event._id)}}
              className={classes.menuButton}
            >
              <Delete/>
            </IconButton>
        </div>

        <Typography gutterBottom variant="h5" component="h2">
            {event.name}
        </Typography>

        <Typography component="p">
            {event.desc}
        </Typography>

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
    events: state.events
  }
}

export default connect(mapStateToProps, {  deleteEvent })(withStyles(styles)(ViewEvent));
