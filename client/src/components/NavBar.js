import React from "react"; // useContext
import { Link } from "react-router-dom"; // useHistory
// import { AuthContext } from "./firebase/Auth";
// import { logOut } from "./firebase/Firebase";

const NavBar = () => {
  // const { currentUser } = useContext(AuthContext);
  // const history = useHistory();
  console.log("NavBar");

  // const handleLoginButtonClick = async (action) => {
  //   try {
  //     switch (action) {
  //       case "LogIn":
  //         history.push("/login");
  //         break;
  //       case "LogOut":
  //         logOut();
  //         history.push("/");
  //         break;
  //       default:
  //         // alert(`unexpected action: ${action}`);
  //         break;
  //     }
  //   } catch (e) {
  //     // console.log(`${e}`);
  //     // alert(e.message);
  //   }
  // };

  return (
    <nav id="top-navbar" className="navbar navbar-expand-sm">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarItems"
        aria-controls="navbarItems"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        Menu
      </button>
      <Link className="navbar-brand" to="/">
        Carigslist
      </Link>
      <div className="collapse navbar-collapse" id="navbarItems">
        <ul className="navbar-nav">
          <Link className="nav-link" to="/sellers">
            Sellers
          </Link>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#search_cars"
              data-toggle="dropdown"
            >
              Search Cars
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <Link className="nav-link1" to="/find_by_vin">
                Find By Vin
              </Link>
              <br />
              <Link className="nav-link1" to="/find_by_make">
                Find By Make
              </Link>
              <br />
              <Link className="nav-link1" to="/find_by_year">
                Find By Year
              </Link>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#analytics_dd"
              data-toggle="dropdown"
            >
              Analytics
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <Link className="nav-link1" to="/kelly">
                Kelly
              </Link>
              <br />
              <Link className="nav-link1" to="/safety">
                Safety
              </Link>
              <br />
              <Link className="nav-link1" to="/dot">
                DOT
              </Link>
            </div>
          </li>
        </ul>
      </div>
      {/* <div className="account_info">
        {currentUser && (
          <span className="userName">{currentUser.displayName}</span>
        )}
        {currentUser && (
          <button
            type="button"
            onClick={() => handleLoginButtonClick("LogOut")}
          >
            Logout
          </button>
        )}
        {!currentUser && (
          <button type="button" onClick={() => handleLoginButtonClick("LogIn")}>
            LogIn
          </button>
        )}
      </div> */}
    </nav>
  );
};
export default NavBar;
