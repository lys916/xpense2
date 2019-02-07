import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Events from './Events';
import Transactions from './Transactions';
import CreateEvent from './CreateEvent';
import CreateTransaction from './CreateTransaction';
import Volunteers from './Volunteers';
import Settings from './Settings';
import ViewEvent from './ViewEvent';
import ViewTransaction from './ViewTransaction';

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

class App extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  changeContent = (path)=>{
    this.setState({mobileOpen: false}, ()=>{
      this.props.history.push(`/${path}`);
    });
  }

  render() {
    const { classes, theme } = this.props;
    const pathStr = this.props.location.pathname;
    if(pathStr === '/'){
      this.props.history.push('/events');
      return null;
    }
    const pathArray = pathStr.split('/');
    const pathname = pathArray[1];
    const pathIndex = pathArray[2];
    // drawer in jsx
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>

          <ListItem button onClick={()=>{this.changeContent('events')}}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary='Events' />
          </ListItem>

          <ListItem button onClick={()=>{this.changeContent('transactions')}}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary='Transactions' />
          </ListItem>

          <ListItem button onClick={()=>{this.changeContent('volunteers')}}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary='Volunteers' />
          </ListItem>

          <ListItem button onClick={()=>{this.changeContent('settings')}}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary='Settings' />
          </ListItem>

        </List>
        <Divider />
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />

        {/* HEADER */}
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>

            { pathname === 'create-event' || pathname === 'event' ?  
              <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={()=>{this.props.history.push('/events')}}
              className={classes.menuButton}
            >
              <ArrowBack/>
            </IconButton>
            : null}

              { pathname === 'create-transaction' || pathname === 'transaction' ?  
              <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={()=>{this.props.history.push('/transactions')}}
              className={classes.menuButton}
            >
              <ArrowBack/>
            </IconButton>
            : null}

            { pathname === 'events' || pathname === 'transactions' || pathname === 'volunteers' || pathname === 'settings'?  
              <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon/>
            </IconButton>
            : null}

            
         
           

          
            <Typography variant="h6" color="inherit" noWrap>
              {pathname === 'events' ? 'Events' : null }
              {pathname === 'transactions' ? 'Transactions' : null }
              {pathname === 'create-event' ? 'Create Event' : null }
              {pathname === 'create-transaction' ? 'Create Transaction' : null }
              {pathname === 'volunteers' ? 'Volunteers' : null }
              {pathname === 'settings' ? 'Settings' : null }
            </Typography>

          </Toolbar>
        </AppBar>

        {/* SIDE DRAWER */}
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {/* jsx drawer */}
              {drawer}
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
              {/* jsx drawer */}
              {drawer} 
            </Drawer>
          </Hidden>
        </nav>

        {/* MAIN CONTENT */}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {pathname === 'events' ? <Events history={this.props.history} /> : null}
          {pathname === 'transactions' ? <Transactions history={this.props.history} /> : null}
          {pathname === 'create-event' ? <CreateEvent /> : null}
          {pathname === 'create-transaction' ? <CreateTransaction /> : null}
          {pathname === 'volunteers' ? <Volunteers /> : null}
          {pathname === 'settings' ? <Settings /> : null}
          {pathname === 'event' ? <ViewEvent location={this.props.location}/> : null}
          {pathname === 'transaction' ? <ViewTransaction location={this.props.location}/> : null}
        </main>

      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);