import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from './NavBar';
import Safety from './components/Safety';
import Seller from './components/Seller';
import Kelly from './components/Kelly';
import DOT from './components/DOT';
import MessageBoard from './components/MessageBoard';
import Login from './components/Login';
import Home from './components/Home';
import SignUp from './components/SignUp';
import LogOut from './components/LogOut';
import ErrorPage from './components/ErrorPage';
import Search from './components/Search';
import {AuthProvider} from './components/firebase/Auth';
import ChkRoute from './components/ChkRoute';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
    <Router>
    <div className="App">
      <NavBar />
	    {/* only act on one route  */}
	       <Switch>
                 <Route exact path="/" component={Home} />
                 <ChkRoute path="/seller" component={Seller} />
                 <Route path="/kelly" component={Kelly} />
                 <Route path="/safety" component={Safety} />
                 <Route path="/dot" component={DOT} />
                 <Route path="/message_board" component={MessageBoard} />
                 <Route path="/login" component={Login} />
                 <Route path="/logout" component={LogOut} />
                 <Route path="/signup" component={SignUp} />
                 <Route path="/search" component={Search} />
	         {/* all other routes will default to the 404 error page */}
                 <Route component={ErrorPage} />
	       </Switch>
    </div>
    </Router>
    </AuthProvider>
  );
};

export default App;
