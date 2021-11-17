import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from './NavBar';
import Safety from './components/Safety';
import Sellers from './components/Sellers';
import SellCar from './components/SellCar';
import Kelly from './components/Kelly';
import DOT from './components/DOT';
import MessageBoard from './components/MessageBoard';
import Login from './components/Login';
import Home from './components/Home';
import SignUp from './components/SignUp';
import ErrorPage from './components/ErrorPage';
import FindByModel from './components/FindByModel';
import FindByMake from './components/FindByMake';
import FindByVin from './components/FindByVin';
import FindByYear from './components/FindByYear';
import RecentSales from './components/RecentSales';
import MyListings from './components/MyListings';
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
                 <ChkRoute path="/sellers" component={Sellers} />
                 <ChkRoute path="/sell_car" component={SellCar} />
                 <ChkRoute path="/my_listings" component={MyListings} />
                 <ChkRoute path="/message_board" component={MessageBoard} />
                 <Route path="/recent_sales" component={RecentSales} />
                 <Route path="/kelly" component={Kelly} />
                 <Route path="/safety" component={Safety} />
                 <Route path="/dot" component={DOT} />
                 <Route path="/login" component={Login} />
                 <Route path="/signup" component={SignUp} />
                 <Route path="/find_by_model" component={FindByModel} />
                 <Route path="/find_by_make" component={FindByMake} />
                 <Route path="/find_by_vin" component={FindByVin} />
                 <Route path="/find_by_year" component={FindByYear} />
	         {/* all other routes will default to the 404 error page */}
                 <Route component={ErrorPage} />
	       </Switch>
    </div>
    </Router>
    </AuthProvider>
  );
};

export default App;
