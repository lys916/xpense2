import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import { signOut } from './actions/userActions';
import Popover from '@material-ui/core/Popover';
// import DrawerMenu from './DrawerMenu';

class HeaderBar extends React.Component {

	state = {
    anchorEl: null,
  };

  handleSignOut = ()=>{
	  this.props.signOut(this.props.history);
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

	redirect = (path)=>{
		this.props.history.push(`/${path}`);
	}

	render() {
		const { classes, user } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
		return (
			<div className={classes.root}>

				{/* HEADER */}
				<AppBar position="static">
					<Toolbar className={classes.toolBar} >
						<Button className={classes.loginButton}
							color="inherit">XPENSE
						</Button>
						<div>
						{user.name}
						<IconButton
							// aria-owns={open ? 'menu-appbar' : null}
							aria-haspopup="true"
							onClick={this.handleClick}
							color="inherit"
							>
							<AccountCircle />
						</IconButton>
						</div>
					</Toolbar>
				</AppBar>

				<Popover
					id="simple-popper"
					open={open}
					anchorEl={anchorEl}
					onClose={this.handleClose}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
					>
					<Typography className={classes.popover} onClick={this.handleSignOut}>Sign Out</Typography>
				</Popover>
				{/* <DrawerMenu openMenu={this.state.openMenu} toggleDrawer={this.toggleDrawer} /> */}
			</div>
		);
	}
}

HeaderBar.propTypes = {
	classes: PropTypes.object.isRequired,
};

const styles = {
	root: {
		flexGrow: 1,
		position: 'fixed',
		top: 0,
		zIndex: 1,
		width: '100%'
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
	toolBar: {
		justifyContent: 'space-between'
	},
	popover: {
		padding: 10
	}
};

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps, {signOut})(withStyles(styles)(HeaderBar));