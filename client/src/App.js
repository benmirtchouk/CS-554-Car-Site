import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  AuthProvider,
  PrivateRoute,
  Header,
  Home,
  Sellers,
  SellCar,
  RecentSales,
  MyListings,
  MessageBoard,
  Vin,
  Safety,
  Account,
  Login,
  SignUp,
  FindByModel,
  FindByMake,
  FindByVin,
  FindByYear,
  ErrorPage,
} from "./components";

import "./App.css";
import "./Carigs.css";

const App = () => (
  <AuthProvider>
    <Router>
      <div className="App">
        <Header />
        <div className="body_bars">
          {/* only act on one route  */}
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute path="/sellers" component={Sellers} />
            <PrivateRoute path="/sell_car" component={SellCar} />
            <PrivateRoute path="/my_listings" component={MyListings} />
            <PrivateRoute path="/message_board" component={MessageBoard} />
            <Route path="/recent_sales" component={RecentSales} />
            <Route path="/safety" component={Safety} />
            <Route path="/vin" component={Vin} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/account" component={Account} />
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
