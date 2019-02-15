import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'
import { getEvents } from './actions/eventActions';
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

class Events extends Component {
  componentDidMount(){
    window.scrollTo(0, 0);
    if(this.props.events.length < 1){
      this.props.getEvents();
    }
  }
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
                <Card className={classes.card} onClick={()=>{this.props.history.push(`/event/${event._id}`)}}>
                <CardActionArea>
                  <CardContent className={classes.content}>
                    
                    <div className={classes.title}>
                      {event.name}
                    </div>

                    <div className={classes.desc}>
                      {event.desc}
                    </div>

                    <div className={classes.desc}>
                      Total budget: ${event.budget}
                    </div>

                    <div className={classes.desc}>
                      Remaining budget: ${event.budget - 230}
                    </div>

                    <div className={classes.desc}>
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
                      Transactions: 5
                    </div>
                    <div className={classes.createdOn}>
                      Transactions amount: $230
                    </div>
                    <div className={classes.createdOn}>
                      created on: {event.dateCreated}
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
            )
          })}
        </div>}

        
        <div className={classes.space}></div>
          <Fab color="primary" aria-label="Add" className={classes.fab} onClick={()=>{this.props.history.push('/create-event')}}>
            <AddIcon />
          </Fab>
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
    paddingBottom: 10
  },
  imageBox: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  img: {
    width: '20vw',
    height: '100%',
    marginRight: 10
  },
  createdOn: {
    color: 'gray',
    paddingTop: 10
  }
});

const mapStateToProps = (state) => {
	return {
    events: state.events,
    user: state.user
  }
}

export default connect(mapStateToProps, {  getEvents })(withStyles(styles)(Events));

