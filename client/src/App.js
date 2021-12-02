import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  AuthProvider,
  ChkRoute,
  NavBar,
  Home,
  Sellers,
  SellCar,
  RecentSales,
  MyListings,
  MessageBoard,
  Kelly,
  Safety,
  DOT,
  Login,
  SignUp,
  FindByModel,
  FindByMake,
  FindByVin,
  FindByYear,
  ErrorPage,
} from "./components";

import "./App.css";

const App = () => (
  <AuthProvider>
    <Router>
      <div className="App">
        <div className="body_bars ml-0 mr-0 pl-0 pr-0">
          <div className="row col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 mx-10">
            <NavBar />
          </div>
        </div>
        <div className="body_bars ml-2 mr-0 pl-0 pr-0">
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
      </div>
    </Router>
  </AuthProvider>
);

export default App;
