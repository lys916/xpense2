import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// evetns array should be coming from database
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
    return (
      <div className="Event">
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
