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
    open: false
  }

   handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, image: null });
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
    this.props.createTransaction({title, amount, desc, images}, this.props.history);
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
      <div className="CreateTransaction">
        <form className={classes.container} noValidate autoComplete="off">
          
          <TextField
            id="outlined-name"
            label="Title"
            className={classes.textField}
            value={this.state.title}
            onChange={this.handleChange('title')}
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="outlined-name"
            label="Amount"
            className={classes.textField}
            value={this.state.amount}
            onChange={this.handleChange('amount')}
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="outlined-name"
            label="Event Description"
            className={classes.textArea}
            value={this.state.desc}
            onChange={this.handleChange('desc')}
            margin="normal"
            variant="outlined"
            multiline={true}
            rows={4}
          />
          
        </form>
        <br/>
        <div className={classes.imageBox}>
          {this.state.images.map(img=>{
            return(
              <div className={classes.cameraImg} ><img className={classes.img} src={img} /></div>
            )
          })}
          
        </div>
        
        <br/>
        <Button className={classes.button} variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Take Photo
        </Button>
        <br/><br/>
        <Button variant="contained" color="primary" className={classes.button}onClick={this.createTransaction} >
          Create Transaction
        </Button>


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
          //  idealResolution = {{width: 50, height: 60}}
        />}
          </DialogContent>
          {this.state.image ? <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleAcceptPhoto} color="primary" autoFocus>
              Okay
            </Button>
          </DialogActions> : <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>

          </DialogActions>}
          

        </Dialog>
        
      </div>
    );
  }
}

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  },
  textArea: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    width: '100%'
  },
  cameraImg: {
    width: '45%'
  },
  img: {
    width: '100%'
  },
  imageBox: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  }
});

const mapStateToProps = (state) => {
	return {
  }
}

export default connect(mapStateToProps, {  createTransaction })(withStyles(styles)(CreateTransaction));

