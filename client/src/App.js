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
import ErrorPage from './components/ErrorPage';
import Search from './components/Search';
import './App.css';

const App = () => {
  return (
    <Router>
    <div className="App">
      <NavBar />
	    {/* only act on one route  */}
	       <Switch>
                 <Route exact path="/" component={Home} />
                 <Route exact path="/seller" component={Seller} />
                 <Route exact path="/kelly" component={Kelly} />
                 <Route exact path="/safety" component={Safety} />
                 <Route exact path="/dot" component={DOT} />
                 <Route exact path="/message_board" component={MessageBoard} />
                 <Route exact path="/login" component={Login} />
                 <Route exact path="/signup" component={SignUp} />
                 <Route exact path="/search" component={Search} />
	         {/* all other routes will default to the 404 error page */}
                 <Route component={ErrorPage} />
	       </Switch>
    </div>
    </Router>
  );
};

export default App;
