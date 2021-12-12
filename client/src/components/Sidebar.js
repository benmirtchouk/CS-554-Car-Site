/* eslint react/prop-types: 0 */
import React from "react";
import { ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Sidebar = ({ sideItems }) => (
  <ListGroup>
    {sideItems &&
      sideItems.map((item) => (
        <LinkContainer
          key={item.name}
          to={item.link}
          className="cursor-pointer"
        >
          <ListGroup.Item>{item.name}</ListGroup.Item>
        </LinkContainer>
      ))}
  </ListGroup>
);

export default Sidebar;
