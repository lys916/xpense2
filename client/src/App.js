import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
// import NewTrans from './NewTrans';
// import UserList from './UserList';
// import Settings from './Settings';
import Transactions from './Transactions';
import Events from './Events';
import Users from './Users';
import Login from './Login';
import Register from './Register';
import CreateTransaction from './CreateTransaction';
import CreateEvent from './CreateEvent';
import ViewTransaction from './ViewTransaction';
import ViewEvent from './ViewEvent';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route path='/' component={Home}  />
            <Route path='/transactions' component={Transactions} />
            <Route path='/events' component={Events} />
            <Route path='/users' component={Users} />
            <Route path='/create-transaction' component={CreateTransaction} />
            <Route path='/create-event' component={CreateEvent} />
            {/* <Route path='/user-list' component={RequireAuth(UserList)} /> */}
            {/* <Route path='/settings' component={RequireAuth(Settings)} /> */}
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/transaction/:id' component={ViewTransaction}  />
            <Route path='/event/:id' component={ViewEvent}  />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;