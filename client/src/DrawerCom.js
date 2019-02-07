import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';

import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

// import MainRouter from './MainRouter';

class DrawerCom extends Component {
       state = {
    openEvents: false,
    openTrans: false
  };
  handleClickEvents = () => {
    this.setState(state => ({ openEvents: !state.openEvents, openTrans: false }));
  };
  handleClickTrans = () => {
    this.setState(state => ({ openTrans: !state.openTrans, openEvents: false }));
  };

  render() {
    const { classes, theme } = this.props;
    return (
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={this.props.container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.props.mobileOpen}
            onClose={this.props.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
          </Drawer>
        </Hidden>

        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <div className="Drawer">
              <div className={classes.toolbar} />
              {/* Event Menu + Submenus */}
              <Divider />
              <List
                component="nav"
                // subheader={<ListSubheader component="div">Nested List Items</ListSubheader>}
                className={classes.listRoot}
              >
                <ListItem style={this.props.active === 'events' ? {background: 'red'} : {}} button onClick={this.handleClickEvents}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Events" />
                  {this.state.openEvents ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={this.state.openEvents} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                      <ListItemText inset primary="All Events" />
                    </ListItem>
                    
                    <ListItem button className={classes.nested} onClick={()=>{this.props.history.push('/add_event')}}>
                      <ListItemText inset primary="Create Event" />
                    </ListItem>
                  </List>
                </Collapse>
              </List>
          
              <Divider />

              {/* Transaction Menu + Submenus */}
              <List
                component="nav"
                // subheader={<ListSubheader component="div">Nested List Items</ListSubheader>}
                className={classes.listRoot}
              >
                <ListItem button onClick={this.handleClickTrans}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Transactions" />
                  {this.state.openTrans ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={this.state.openTrans} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                      <ListItemText inset primary="All Transactions" />
                    </ListItem>
                    
                    <ListItem button className={classes.nested}>
                      <ListItemText inset primary="Create Transaction" />
                    </ListItem>
                  </List>
                </Collapse>
              </List>
          
              <Divider />  
            </div>
          </Drawer>
        </Hidden>
      </nav>
    );
  }
}

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

DrawerCom.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(DrawerCom);
