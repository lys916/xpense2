import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';


class Loading extends Component {

  render() {
    const { classes, others } = this.props;

    return (
      <div className={classes.root}>
      {/* <Dialog
          open={true}
        //   onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >dsfsd */}
      {others.isLoading ? 
      <div>
        <CircularProgress className={classes.progress}/>
        <div className={classes.loading}>
            {others.loadingMessage}
        </div>
      </div> : null }
      {/* </Dialog> */}
      </div>
    );
  }
}

const styles = theme => ({
  root: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loading: {
      color: 'white'
  }
});

const mapStateToProps = (state) => {
	return {
    others: state.others
  }
}

export default connect(mapStateToProps, {  })(withStyles(styles)(Loading));

