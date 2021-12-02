import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";

const Sidebar = ({ sideLinks }) => (
  <div className="sidenav">
    <nav>
      {sideLinks.map((item) => (
        <Link key={item.name} to={item.link}>
          {item.name}
        </Link>
      ))}
      <Search />
    </nav>
  </div>
);

Sidebar.propTypes = {
  sideLinks: Array.isRequired,
};

export default Sidebar;
