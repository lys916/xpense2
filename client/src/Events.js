import { connect } from 'react-redux';
import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { getEvents } from './actions/eventActions';

// evetns array should be coming from database

class Events extends Component {

  componentDidMount(){
    if(this.props.events.length < 1){
      this.props.getEvents();
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="Event">
      {this.props.events.map((event, index)=>{
        return(
          <Card className={classes.card} onClick={()=>{this.props.history.push(`/event/${index}`)}}>
            <CardActionArea>
              <CardContent>

                <Typography gutterBottom variant="h5" component="h2">
                  {event.name}
                </Typography>

                <Typography component="p">
                  {event.desc}
                </Typography>

              </CardContent>
            </CardActionArea>
          </Card>
        )
      })}
      <div className={classes.space}></div>
        <Fab color="primary" aria-label="Add" className={classes.fab} onClick={()=>{this.props.history.push('/create-event')}}>
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

const mapStateToProps = (state) => {
	return {
    events: state.events
  }
}

export default connect(mapStateToProps, {  getEvents })(withStyles(styles)(Events));
