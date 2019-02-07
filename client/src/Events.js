import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import NavBar from './NavBar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const events = [
    {name: 'Event 1', desc: 'Event 1 description'},
    {name: 'Event 2', desc: 'Event 2 description'},
    {name: 'Event 3', desc: 'Event 3 description'},
    {name: 'Event 4', desc: 'Event 4 description'},
    {name: 'Event 5', desc: 'Event 5 description'}
];

class Events extends Component {
  render() {
    const { classes } = this.props;
    console.log('event props', this.props);
    return (
      <div className="Event">
      <div>
            <Typography gutterBottom variant="h5" component="h2">
                All Events
            </Typography>
        </div>
        {events.map(event=>{
          return(
            <Card className={classes.card}>
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

export default withStyles(styles)(Events);
