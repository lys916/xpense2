import React from 'react';
import { connect } from 'react-redux';
import { signIn } from './actions/userActions';
import { Link } from 'react-router-dom';
// import Loader from '../loader/Loader';



class Login extends React.Component {
  state = {
    name: '',
    password: ''
  }

  handleSignIn = () => {
      this.props.signIn(this.state, this.props.history);
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
          <div className="circle"></div>
        </div>

        <br/><br/>
        {this.props.others.userErrorMessage ? <div className="error-message">{this.props.others.userErrorMessage}</div> : null}
        <input name="email" value={this.state.email} 
        placeholder="Email" onChange={this.handleOnChange}/><br />

        <input name="password" type="password" value={this.state.value} 
        placeholder="Password" onChange={this.handleOnChange}/><br />

        <button className="signin" onClick={() => {this.handleSignIn()}}>LOG IN</button><br />
        <div className="have-account">Don't have an account? <Link to="/register">Sign up!</Link></div>
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
export default connect(mapStateToProps, {signIn})(Login);