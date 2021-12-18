import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import io from "socket.io-client";
import {
  AuthProvider,
  PrivateRoute,
  Header,
  Home,
  Sellers,
  SellerDetails,
  SellCar,
  Sidebar,
  RecentSales,
  RecentListings,
  AllListings,
  MyListings,
  AddListing,
  Listing,
  MessageBoard,
  Vin,
  Safety,
  Account,
  PasswordReset,
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

const socket = io("http://localhost:3001", {
  transports: ['websocket'],
  withCredentials: true,
  extraHeaders: {
    "cred-header": "abcd"
  }
});
const SocketContext = React.createContext(socket);


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <div id="top" />
          <Header />
          <Row className="nav-offset">
            <Col xs={12} md={2} className="sidebar">
              <Sidebar />
            </Col>
            <Col xs={12} md={{ span: 10, offset: 2 }}>
              <Container>
                {/* only act on one route  */}
                <Switch>
                  <Route exact path="/" component={Home} />
                  <PrivateRoute path="/sellers" component={Sellers} />
                  <PrivateRoute
                    path="/seller/:sellerId"
                    component={SellerDetails}
                  />
                  <PrivateRoute path="/sell_car" component={SellCar} />
                  <Route path="/listings" component={AllListings} />
                  <Route path="/listing/:id" component={Listing} />
                  <PrivateRoute path="/my_listings" component={MyListings} />
                  <SocketContext.Provider value={socket}>
                    <PrivateRoute
                      path="/message_board"
                      component={MessageBoard}
                    />
                  </SocketContext.Provider>

                  <PrivateRoute path="/add_listing" component={AddListing} />
                  <PrivateRoute
                    path="/message_board"
                    component={MessageBoard}
                  />
                  <Route path="/recent_sales" component={RecentSales} />
                  <Route path="/recent_listings" component={RecentListings} />
                  <Route path="/safety" component={Safety} />
                  <Route path="/vin" component={Vin} />
                  <Route path="/login" component={Login} />
                  <PrivateRoute path="/account" component={Account} />
                  <Route path="/reset_pwd" component={PasswordReset} />
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
