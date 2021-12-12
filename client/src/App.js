import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import {
  AuthProvider,
  PrivateRoute,
  Header,
  Home,
  Sellers,
  SellCar,
  Sidebar,
  RecentSales,
  MyListings,
  AddListing,
  MessageBoard,
  Vin,
  Safety,
  Account,
  Login,
  SignUp,
  SearchResults,
  FindByModel,
  FindByMake,
  FindByVin,
  FindByYear,
  ErrorPage,
} from "./components";

import "./App.css";
import "./Carigs.css";

const App = () => {
  const [sideItems, setSideItems] = useState([
    {
      name: "Recent Sales",
      link: "/recent_sales",
    },
  ]);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <Row>
            <Col xs={6} md={2} className="bg-gray-50 h-sidebar">
              <Sidebar sideItems={sideItems} />
            </Col>
            <Col xs={12} md={10}>
              <Container>
                {/* only act on one route  */}
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={(props) => (
                      <Home setSidebar={setSideItems} {...props} />
                    )}
                  />
                  <PrivateRoute path="/sellers" component={Sellers} />
                  <PrivateRoute path="/sell_car" component={SellCar} />
                  <PrivateRoute path="/my_listings" component={MyListings} />
                  <PrivateRoute
                    path="/message_board"
                    component={MessageBoard}
                  />
                  <Route path="/recent_sales" component={RecentSales} />
                  <Route path="/safety" component={Safety} />
                  <Route path="/vin" component={Vin} />
                  <Route path="/login" component={Login} />
                  <PrivateRoute path="/account" component={Account} />
                  <Route path="/signup" component={SignUp} />
                  <Route path="/search_results" component={SearchResults} />
                  <Route path="/find_by_model" component={FindByModel} />
                  <Route path="/find_by_make" component={FindByMake} />
                  <Route path="/find_by_vin" component={FindByVin} />
                  <Route path="/find_by_year" component={FindByYear} />
                  {/* all other routes will default to the 404 error page */}
                  <Route component={ErrorPage} />
                </Switch>
              </Container>
            </Col>
          </Row>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
