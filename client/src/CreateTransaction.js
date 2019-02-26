import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import axios from 'axios';
import { createTransaction } from './actions/transactionActions';
import PhotoCam from '@material-ui/icons/PhotoCamera';
import Icon from '@material-ui/core/Icon';
import Event from '@material-ui/icons/Event';

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

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import HighlightOff from '@material-ui/icons/HighlightOff';

import { getEvents } from './actions/eventActions';

import CircularProgress from '@material-ui/core/CircularProgress';


// const events = [{name: 'Event 1'},{name: 'Event 2'},{name: 'Event 3'},{name: 'Event 1'},{name: 'Event 2'},{name: 'Event 3'},{name: 'Event 1'},{name: 'Event 2'},{name: 'Event 3'}];

class CreateTransaction extends Component {
  state = {
    title: '',
    amount: '',
    desc: '',
    image: null,
    images: [],
    open: false,
    openEvent: false,
    selectedEvent: null,
    eventSearchInput: '',
    events: [...this.props.events],
    error: null
  }

   componentDidMount(){
    if(this.props.events.length < 1){
      this.props.getEvents();
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    this.setState({events: nextProps.events});
  }

   handleClickOpen = () => {
    this.setState({ open: true });
  };

   handleClickOpenEvent = () => {
    this.setState({ openEvent: true, events: this.props.events });
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
    this.setState({[name]: event.target.value, error: '' });
  };

  createTransaction = ()=>{
    const {title, amount, desc, images, selectedEvent} = this.state;
    if(!selectedEvent){
      this.setState({error: 'event'});
    }
    else if(title === ''){
      this.setState({error: 'title'});
    }else if(amount === ''){
      this.setState({error: 'amount'});
    }

    else if(desc === ''){
      this.setState({error: 'desc'});
    }else{

    this.props.createTransaction({title, amount, desc, images, user: this.props.user._id, event: selectedEvent._id}, this.props.history);
    }
  }

  onTakePhoto (dataUri) {
    // Do stuff with the dataUri photo...
    // console.log('takePhoto', dataUri);
    this.setState({image: dataUri});
  }

  onSearchChange = (e)=>{
   
    if(e.target.value === ''){
      this.setState({
        events: this.props.events, 
        eventSearchInput: e.target.value
      });
    }else{
      this.setState({
        eventSearchInput: e.target.value
      });
      this.filterEvent(e.target.value);
    }
    
  }

  handleSelectEvent = (event)=>{
    this.setState({selectedEvent: event, eventSearchInput: event.name});
    this.filterEvent(event.name);
  }

  filterEvent = (name)=>{
    const filteredEvents = this.props.events.filter(event=>{
      return event.name.includes(name);
    });
    console.log('filtered', filteredEvents);
    this.setState({events: filteredEvents});
  }

  resetSearch = ()=>{
    this.setState({eventSearchInput: '', events: this.props.events});
  }

  handleRemoveSelection = ()=>{
    this.setState({
      eventSearchInput: '',
      selectedEvent: null
    });
    this.handleCloseEvent();
  }

  removeSelectedEvent = ()=>{
    this.setState({selectedEvent: null});
  }

  render() {
    const { classes, events, others } = this.props;
    const { error } = this.state;
    console.log(others.isLoading);
    return (
      <div className={classes.root}>
        
        <br/><br/><br/>
        {error === 'event' ? <div className={classes.formError}>Event is required</div>:<div className={classes.formError}></div>}
        <div className={classes.info}>What event is this transaction for?*</div>
        {this.state.selectedEvent ?
          <div className={classes.selectedEventBox}>
            <div className={classes.selectedEvent}>         {this.state.selectedEvent.name}
            </div>
            <div>
              {/* <IconButton className={classes.removeEventButton} aria-label="Directions"> */}
              <HighlightOff className={classes.removeEventButton} onClick={this.removeSelectedEvent}/>
            {/* </IconButton> */}
            </div>

            

          </div>
            : 
          <Button className={classes.button} variant="outlined" color="primary" onClick={this.handleClickOpenEvent}>
          Select An Event &nbsp;

          <Event/>

        </Button>
        }
        
  
         <div className={classes.info}>Take photo of receipts and other items.</div>
        <Button className={classes.button} variant="outlined" color="primary" onClick={this.handleClickOpen}>
          {this.state.images.length > 0 ? 'Take More Photo' : 'Take A Photo' } &nbsp;
          
          <PhotoCam/>
 
        </Button>

        {this.state.images.length > 0 ? 
          <div className={classes.imageBox}>
            {this.state.images.map(img=>{
              return(
                <div className={classes.cameraImg} ><img className={classes.img} src={img} /></div>
              )
            })}
          </div> : null
        }
        
        
        <form className={classes.container} noValidate autoComplete="off">
          {error === 'title' ? <div className={classes.formError}>Transaction title is required</div>:<div className={classes.formError}></div>}
          <TextField
            id="outlined-name"
            label="Transaction title*"
            className={classes.textField}
            value={this.state.title}
            onChange={this.handleChange('title')}
            margin="normal"
            variant="outlined"
          />

          {error === 'amount' ? <div className={classes.formError}>Transaction amount is required</div>:<div className={classes.formError}></div>}
          <TextField
            id="outlined-name"
            label="Transaction amount*"
            className={classes.textField}
            value={this.state.amount}
            onChange={this.handleChange('amount')}
            margin="normal"
            variant="outlined"
          />

          {error === 'desc' ? <div className={classes.formError}>Transaction description is required</div>:<div className={classes.formError}></div>}
          <TextField
            id="outlined-name"
            label="Transaction description*"
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
						// idealResolution = {{width: 100, height: 130}}
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
            className={classes.dialogEventRoot}
        	>

          {/* search box */}
          <Paper className={classes.searchRoot} elevation={1}>
            
            <InputBase className={classes.input} placeholder="Search Event" value={this.state.eventSearchInput} onChange={this.onSearchChange} />

            <IconButton className={classes.iconButton} aria-label="Search">
              <SearchIcon />
            </IconButton>

            <Divider className={classes.divider} />
            
            <IconButton className={classes.iconButton} aria-label="Directions" onClick={this.resetSearch}>
              <HighlightOff />
            </IconButton>
          </Paper>


          {/* dialog form */}
          {/* <div>
           <form className={classes.container} noValidate autoComplete="off">
  
          <TextField
            id="outlined-name"
            label="Search"
            className={classes.textField}
            value={this.state.selectedEvent.name}
            onChange={this.handleChange('title')}
            margin="normal"
            variant="outlined"
          />
          </form>
          </div> */}

          
          <DialogContent className={classes.dialogContent}>
            <div className={classes.dialogEvents}>
            {this.state.events.map(event=>{
              return(
                <div className={classes.dialogEvent} onClick={()=>{this.handleSelectEvent(event)}}>
                  <div className={classes.eventName}>{event.name}
                  </div>
                </div>
              );
            })}
            </div>
          </DialogContent>
            
          <DialogActions className={classes.dialogFooter}>
            <Button onClick={this.handleRemoveSelection} color="primary">
            Cancel
            </Button>
     
              <Button onClick={this.handleCloseEvent} color="primary" autoFocus>
                Okay
              </Button> 
            
          </DialogActions> 
      	</Dialog>

      </div>
    );
  }
}

const styles = theme => ({
searchRoot: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '90%',
    margin: '10px auto',
    height: 50,
    maxHeight: 38
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },

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
    // marginBottom: 0,
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
    width: '97%',
    background: 'white',
    border: '1px solid #bbbbbb',
    textTransform: 'none',
    marginBottom: 7,
    height: 45
  },
  createButton: {
    marginBottom: 70,
    width: '95%',
    marginTop: 10
  },
  cameraImg: {
    width: '45%',
  },
  img: {
    width: '100%'
  },
  imageBox: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    // border: '1px dashed #bbbbbb',
    marginTop: 10,
    // // padding: '5px 0px 2px 0px',
    // borderRadius: 4
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
  dialogEventRoot: {
  },
  dialogContent: {
  },
  dialogEvents: {
  },
  dialogEvent: {
    borderBottom: '1px solid #dedede',
    padding: '15px 2px 8px 2px',
  },
  eventName: {

  },
  selectedEvent: {
    textAlign: 'left',
  },
  selectedEventBox: {
    display: 'flex',
    justifyContent: 'space-between',
    border: '1px dashed #bbbbbb',
    margin: '5px 10px',
    borderRadius: 4,
    padding: '15px 10px 10px 10px'
  },
  removeEventButton: {
    color: 'gray'
  },
  formError: {
    color: 'red',
    marginLeft: 10,
    fontSize: 12,
    height: 1,
    textAlign: 'left'
  }
});

const mapStateToProps = (state) => {
	return {
    user: state.user,
    events: state.events,
    others: state.others
  }
}

export default connect(mapStateToProps, {  createTransaction, getEvents })(withStyles(styles)(CreateTransaction));

