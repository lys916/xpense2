import React from 'react';
import { connect } from 'react-redux';
import HeaderBar from './HeaderBar';
import IconTabs from './Tabs';
import { withStyles } from '@material-ui/core/styles';
import Loading from './Loading';


// import { Link } from 'react-router-dom';

class Home extends React.Component {

	state = {
	}

	componentDidMount() {
		console.log('comp mount');
		const path = this.props.history.location.pathname;
		if(!this.props.user._id){
			this.props.history.push('/login');
		}
	}

	render() {
		console.log('home props', this.props);
		const { classes, others } = this.props;
		const path = this.props.history.location.pathname;
		if(!this.props.user._id){
			return null;
		}
		return (
			<div className={classes.root}>
				<HeaderBar history={this.props.history} path={path} />

			{others.isLoading ? <Loading /> : null}
				{this.props.user ? <IconTabs history={this.props.history}/> : null}
				
			</div>
		);
	}
}

const styles = theme => ({

});

const mapStateToProps = (state) => {
	return {
		user: state.user,
		others: state.others
	}
}

export default connect(mapStateToProps, {  })(withStyles(styles)(Home));