import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/FormatListBulleted';
import FavoriteIcon from '@material-ui/icons/People';
import Event from '@material-ui/icons/Event';
import PersonPinIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class IconTabs extends React.Component {
	state = {
		value: 0
	};

	componentDidMount(){
		const pathString = this.props.history.location.pathname;
		const pathArray = pathString.split('/');
		const path = pathArray[1];
		const pathId = pathArray[2];
		console.log('path', path);
		console.log('pathId', pathId);
		console.log('path array', pathArray);


		if(path === 'transactions' || path === ''){
			this.setState({value: 0});
			this.props.history.push('transactions');
		}
		if(path === 'create-transaction'){
			this.setState({value: 0});
			this.props.history.push('create-transaction');
		}
		if(this.props.user.admin){
			if(path === 'events'){
				this.setState({value: 1});
				this.props.history.push('events');
			}

			if(path === 'create-event'){
				this.setState({value: 1});
				this.props.history.push('create-event');
			}
			if(path === 'event' && pathId){
				this.setState({value: 1});
				// this.props.history.push('create-event');
			}

			if(path === 'volunteers'){
				this.setState({value: 2});
				this.props.history.push('volunteers');
			}
			if(path === 'settings'){
				this.setState({value: 3});
				this.props.history.push('settings');
			}
		
		}else{
			if(path === 'settings'){
				this.setState({value: 1});
				this.props.history.push('settings');
			}
		}
	}

	handleChange = (event, value) => {
		const history = this.props.history;

		if(this.props.user.admin){
			if (value === 0) {
			history.push('/transactions');
			}
			if (value === 1) {
				history.push('/events');
			}
			if (value === 2) {
				history.push('/volunteers');
			}
			if (value === 3) {
				history.push('/settings');
			}
			this.setState({ value });
		}else{
			if (value === 0) {
			history.push('/transactions');
			}
			if (value === 1) {
				history.push('/settings');
			}
			this.setState({ value });
		}

		
	};

	render() {
		const { classes, user } = this.props;
		console.log('tab user', this.props.user);
		return (
			<Paper square className={classes.root}>
				<Tabs
					value={this.state.value}
					onChange={this.handleChange}
					fullWidth
					indicatorColor="primary"
					textColor="primary"
				>
					<Tab className={classes.tab} icon={<PhoneIcon />} label="Transactions" />

					{user.admin ? <Tab className={classes.tab} icon={<Event />} label="Events" /> : null}

					{user.admin ? <Tab className={classes.tab} icon={<FavoriteIcon />} label="Users" /> : null}

					<Tab className={classes.tab} icon={<PersonPinIcon />} label="settings" />
				</Tabs>
			</Paper>
		);
	}
}

Tabs.propTypes = {
	classes: PropTypes.object.isRequired,
};

const styles = {
	root: {
		flexGrow: 1,
		position: 'fixed',
		bottom: 0,
		zIndex: 2,
		width: '100%',
		background: 'white'
	},
	tab: {
		width: '100%',
		fontSize: 10
	}
};

const mapStateToProps = (state) => {
	console.log('home user', state.user);
	return {
		user: state.user
	}
}

export default connect(mapStateToProps, {  })(withStyles(styles)(IconTabs));