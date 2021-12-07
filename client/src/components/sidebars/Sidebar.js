/* eslint react/prop-types: 0 */
import React from "react";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
import Search from "./Search";

const Sidebar = ({ sideLinks }) => (
  <div className="sidenav">
    <nav>
      {sideLinks &&
        sideLinks.map((item) => (
          <Link key={item.name} to={item.link}>
            {item.name}
          </Link>
        ))}
      <Search />
    </nav>
  </div>
);

// Sidebar.propTypes = {
// sideLinks: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
// };

// Sidebar.defaultProps = {
//  sideLinks: [],
// };

export default Sidebar;
