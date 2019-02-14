import React from 'react';
import { connect } from 'react-redux';
import { signUp} from './actions/userActions';
import { Link } from 'react-router-dom';
// import Loader from '../loader/Loader';


import './styleLoginSignup.css';

class SignUp extends React.Component {
  state = {
    name: '',
    password: ''
  }
  handleSignUp = () => {
      this.props.signUp(this.state, this.props.history); 
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  
  render() {
    return (
      <div className="ls-mc">
      {/* {this.props.others.isLoading ? 
              <Loader style={{marginTop: '60px'}} message={this.props.others.loadingMessage}/> 
              : null 
            } */}
      <div className="ls">
        
          
        {/* LOGO */}
        <div className="logo">
          <div className="text">Xpense</div>
          {/* <div className="partial">ple Co</div> */}
          <div className="circle"></div>
        </div>
        
        <br/><br/>
        {this.props.others.userErrorMessage ? <div className="error-message">{this.props.others.userErrorMessage}</div> : null}
        <input type="text" name="name" value={this.state.name} 
        placeholder="Full name" onChange={this.handleOnChange}/><br />

          <input type="text" name="email" value={this.state.email} 
        placeholder="Email" onChange={this.handleOnChange}/><br />

        <input type="password" name="password" value={this.state.password} 
        placeholder="Password" onChange={this.handleOnChange}/><br />

        <button onClick={() => {this.handleSignUp()}}>REGISTER</button><br />
        <div className="have-account">Already have an account? <Link to="/">Log in!</Link></div>
        
        <br />
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    others: state.others
  } 
}

export default connect(mapStateToProps, {signUp})(SignUp);