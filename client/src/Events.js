import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Queue';
import { withStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'
import { getEvents } from './actions/eventActions';
import { connect } from 'react-redux';
import AddTran from '@material-ui/icons/PlaylistAdd';
import DeleteTran from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { deleteEvent } from './actions/eventActions';

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

class Events extends Component {
  state = {
    open: false,
    event: null
  }
  componentDidMount(){
    window.scrollTo(0, 0);
    if(this.props.events.length < 1){
      this.props.getEvents();
    }
  }
  handleClickOpen = (event) => {
    if(event.transactions.length > 0){
      alert('This event cannot be deleted');
    }else{
      this.setState({ open: true, event });
    }
    
  };

  handleDelete = () => {
    this.props.deleteEvent(this.state.id, this.props.history);
    this.handleClose();
  }

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes, events, user } = this.props;
    console.log('props', this.props);
    if(!this.props.user._id){
      this.props.history.push('/login');
      return null;
    }
    return (
      <div className={classes.root}>
        {this.props.events.length < 1 ? <div>There is no event</div>: 
        <div>
          {this.props.events.map((event, index)=>{
            return(
                <Card className={classes.card} >
                  <CardContent className={classes.content} onClick={()=>{this.props.history.push(`/event/${event._id}`)}}>
                    
                    <div className={classes.title}>
                      {event.name}
                    </div>

                    <div className={classes.desc}>
                      {event.desc}
                    </div>

                    <div className={classes.budgetBox}>
                      <div className={classes.budgetItem}>Budget<br/>${event.budget}</div>
                      <div className={classes.budgetItem}>Spent<br/>$100</div>
                      <div className={classes.budgetItem}>Remaining<br/>$400</div>
                    </div>

                    <div className={classes.coord}>
                      Coordinators: {event.coord}
                    </div>

                    {/* <div className={classes.imageBox}>
                      {event.images.map(image=>{
                        return(
                          <img className={classes.img} src={image} />
                        )
                      })}
                        
                    </div> */}
                    <div className={classes.createdOn}>
                      Created on: {event.dateCreated}
                    </div>
                    <div className={classes.numTrans}>
                      # of Transactions: 5
                    </div>
                    
                  </CardContent>

                  <div className={classes.tray}>
                  
                    <IconButton
                      color="default"
                      aria-label="Open drawer"
                      onClick={()=>{}}
                      className={classes.menuButton}
                    >
                    <AddTran/>
                    </IconButton>  

                    <IconButton
                      color="default"
                      aria-label="Open drawer"
                      onClick={()=>{this.handleClickOpen(event)}}
                      className={classes.menuButton}
                    >
                    <DeleteTran/>
                    </IconButton>                     
                  </div>

              </Card>
            )
          })}
        </div>}

        
        <div className={classes.space}></div>
          <Fab color="primary" aria-label="Add" className={classes.fab} onClick={()=>{this.props.history.push('/create-event')}}>
            <AddIcon />
          </Fab>


          {/* DIALOG WHEN DELTE */}
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Delete this event?
            </DialogContentText>
          </DialogContent>
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
    margin: '20px 10px',
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
    paddingBottom: 10,
    borderBottom: '1px solid #efefef'
  },
  budgetBox: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderBottom: '1px solid #efefef',
    paddingBottom: 10,

  },
  budgetItem: {
    width: '100%',
    textAlign: 'center'
  },
  coord: {
    paddingTop: 10,
    borderBottom: '1px solid #efefef',
    paddingBottom: 10,
    fontSize: 14
  },
  createdOn: {
    color: 'gray',
    paddingTop: 10,
    fontSize: 13
  },
  numTrans: {
    fontSize: 13,
    color: 'gray',

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
    events: state.events,
    user: state.user,
    others: state.others
  }
}

export default connect(mapStateToProps, {  getEvents, deleteEvent})(withStyles(styles)(Events));

