import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';


// evetns array should be coming from database
const events = [
  {name: 'Event 1', desc: 'Event 1 description'},
  {name: 'Event 2', desc: 'Event 2 description'},
  {name: 'Event 3', desc: 'Event 3 description'},
  {name: 'Event 4', desc: 'Event 4 description'},
  {name: 'Event 5', desc: 'Event 5 description'}
];

class ViewEvent extends Component {
  render() {
    const pathStr = this.props.location.pathname;
    const pathArray = pathStr.split('/');
    const eventIndex = pathArray[2];
    return (
      <div className="CreateTransaction">
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
export default ViewEvent;
