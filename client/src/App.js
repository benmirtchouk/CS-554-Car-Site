import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from './NavBar';
import Safety from './components/analytics/Safety';
import Sellers from './components/sellers/Sellers';
import SellCar from './components/sellers/SellCar';
import Kelly from './components/analytics/Kelly';
import DOT from './components/analytics/DOT';
import MessageBoard from './components/messaging/MessageBoard';
import Login from './components/auth/Login';
import Home from './components/Home';
import SignUp from './components/auth/SignUp';
import ErrorPage from './components/ErrorPage';
import FindByModel from './components/find_cars/FindByModel';
import FindByMake from './components/find_cars/FindByMake';
import FindByVin from './components/find_cars/FindByVin';
import FindByYear from './components/find_cars/FindByYear';
import RecentSales from './components/sellers/RecentSales';
import MyListings from './components/sellers/MyListings';
import {AuthProvider} from './components/firebase/Auth';
import ChkRoute from './components/auth/ChkRoute';
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
