import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { deleteEvent } from './actions/eventActions';
import { withStyles } from '@material-ui/core/styles';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';


// evetns array should be coming from database
const events = [
  {name: 'Event 1', desc: 'Event 1 description'},
  {name: 'Event 2', desc: 'Event 2 description'},
  {name: 'Event 3', desc: 'Event 3 description'},
  {name: 'Event 4', desc: 'Event 4 description'},
  {name: 'Event 5', desc: 'Event 5 description'}
];

class ViewEvent extends Component {

  handleDeleteEvent =(id)=>{
    console.log(id);
    this.props.deleteEvent(id, this.props.history);
  }

  render() {
    const pathStr = this.props.location.pathname;
    const pathArray = pathStr.split('/');
    const eventIndex = pathArray[2];
    const {classes} = this.props;
    const events = this.props.events;
    console.log('view event render', events);
    if(events.length < 1){
      this.props.history.push('/events');
      return null;
    }

    return (
      <div className="CreateTransaction">
        <div className={classes.viewBar}>
          <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={()=>{this.handleDeleteEvent(events[eventIndex]._id)}}
              className={classes.menuButton}
            >
              <Delete/>
            </IconButton>
        </div>
        <Typography gutterBottom variant="h5" component="h2">
            {events[eventIndex].name}
        </Typography>

        <Typography component="p">
            {events[eventIndex].desc}
        </Typography>
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
  }
});


const mapStateToProps = (state) => {
	return {
    events: state.events
  }
}

export default connect(mapStateToProps, {  deleteEvent })(withStyles(styles)(ViewEvent));
