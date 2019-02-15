import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import axios from 'axios';
import { createTransaction } from './actions/transactionActions';


import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

// import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';



class CreateTransaction extends Component {
  state = {
    title: '',
    amount: '',
    desc: '',
    image: null,
    images: [],
    open: false,
    openEvent: false,
    events: [{name: 'Event 1'},{name: 'Event 2'},{name: 'Event 3'},{name: 'Event 1'},{name: 'Event 2'},{name: 'Event 3'},{name: 'Event 1'},{name: 'Event 2'},{name: 'Event 3'}]
  }

   handleClickOpen = () => {
    this.setState({ open: true });
  };

   handleClickOpenEvent = () => {
    this.setState({ openEvent: true });
  };


  handleClose = () => {
    this.setState({ open: false, image: null });
  };

  handleCloseEvent = () => {
    this.setState({ openEvent: false });
  };

  handleAcceptPhoto = ()=>{
    const image = this.state.image;
    const images = this.state.images;
    images.push(image);
    this.setState({open: false, images, image: null});
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value });
  };

  createTransaction = ()=>{
    const {title, amount, desc, images} = this.state;
    this.props.createTransaction({title, amount, desc, images, user: this.props.user._id}, this.props.history);
  }

  onTakePhoto (dataUri) {
    // Do stuff with the dataUri photo...
    // console.log('takePhoto', dataUri);
    this.setState({image: dataUri});
  }

  render() {
    const {classes} = this.props;
    console.log('photo', this.state.image);
    return (
      <div className={classes.root}>
        <br/><br/><br/>

        <div className={classes.info}>What event is this transaction for?*</div>
        <Button className={classes.button} variant="outlined" color="primary" onClick={this.handleClickOpenEvent}>
          Select An Event
        </Button>
  
         <div className={classes.info}>Take photo of receipts and other items.</div>
        <Button className={classes.button} variant="outlined" color="primary" onClick={this.handleClickOpen}>
          {this.state.images.length > 0 ? 'Take More Photo' : 'Take A Photo' }
        </Button>

        <div className={classes.imageBox}>
          {this.state.images.map(img=>{
            return(
              <div className={classes.cameraImg} ><img className={classes.img} src={img} /></div>
            )
          })}
          
        </div>
        
        <form className={classes.container} noValidate autoComplete="off">
        
          <TextField
            id="outlined-name"
            label="Transaction Title"
            className={classes.textField}
            value={this.state.title}
            onChange={this.handleChange('title')}
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="outlined-name"
            label="Transaction Amount"
            className={classes.textField}
            value={this.state.amount}
            onChange={this.handleChange('amount')}
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="outlined-name"
            label="Transaction Description"
            className={classes.textArea}
            value={this.state.desc}
            onChange={this.handleChange('desc')}
            margin="normal"
            variant="outlined"
            multiline={true}
            rows={4}
          />
          
        </form>
        

        <Button variant="contained" color="primary" className={classes.createButton}onClick={this.createTransaction} >
          Submit Transaction
        </Button>
        <br/><br/>

        {/* camera */}

        	<Dialog
         	fullScreen={true}
          	open={this.state.open}
          	onClose={this.handleClose}
          	aria-labelledby="responsive-dialog-title"
        	>
         {/* <DialogTitle id="responsive-dialog-title">{"Title"}</DialogTitle> */}

				<DialogContent>
					{this.state.image ? 
					<div>
						<img className={classes.img} src={this.state.image} />
					</div> : 
					<Camera
						onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri) } }
						idealFacingMode = {FACING_MODES.ENVIRONMENT}
						isImageMirror = {false}
						idealResolution = {{width: 100, height: 130}}
					/>}
				</DialogContent>

				{this.state.image ? 
				<DialogActions>
					<Button onClick={this.handleClose} color="primary">
					Cancel
					</Button>
					<Button onClick={this.handleAcceptPhoto} color="primary" autoFocus>
					Okay
					</Button>
				</DialogActions> : 
				<DialogActions>
					<Button onClick={this.handleClose} color="primary">
						Cancel
					</Button>
				</DialogActions>}
      	</Dialog>


        {/* select event dialog */}
        	<Dialog
         	fullScreen={true}
          	open={this.state.openEvent}
          	onClose={this.handleCloseEvent}
          	aria-labelledby="responsive-dialog-title"
            className={classes.eventDialog}
        	>
           <form className={classes.container} noValidate autoComplete="off">
        

          <TextField
            id="outlined-name"
            label="Search"
            className={classes.textField}
            value={this.state.title}
            onChange={this.handleChange('title')}
            margin="normal"
            variant="outlined"
          />
          </form>
          <DialogContent>
         
      
          <div>
          {this.state.events.map(event=>{
            return(
              <div>{event.name}</div>
            );
          })}
          </div>


      </DialogContent>
				<DialogActions>
					<Button onClick={this.handleCloseEvent} color="primary">
					Cancel
					</Button>
					<Button onClick={this.handleSelectEvent} color="primary" autoFocus>
					Okay
					</Button>
				</DialogActions> 
      	</Dialog>

      </div>
    );
  }
}

const styles = theme => ({
  root: {
    background: '#efefef'
  },
  info: {
    fontSize: 12,
    textAlign: 'left',
    paddingLeft: 10,
    paddingTop: 8,
    color: '#555555',
    
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
    marginBottom: 0,
    background: 'white',
  },
  textFieldSearch: {width: '100%'},
  textArea: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
    background: 'white'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    width: '95%',
    background: 'white',
    border: '1px solid #bbbbbb',
    textTransform: 'none'
  },
  createButton: {
    marginBottom: 70,
    width: '95%',
    marginTop: 10
  },
  cameraImg: {
    width: '45%',
    marginTop: 10
  },
  img: {
    width: '100%'
  },
  imageBox: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  searchHeader: {
    background: '#dedede',
    padding: '10px 0px 10px 10px'
  },
  searchInput: {
    width: '100%',
    fontSize: 16,
    padding: 5
  },
  eventDialog: {
   
  }
});

const mapStateToProps = (state) => {
	return {
    user: state.user
  }
}

export default connect(mapStateToProps, {  createTransaction })(withStyles(styles)(CreateTransaction));

