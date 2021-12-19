/* eslint react/prop-types: 0 */
import React, { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { AuthContext } from "../firebase/Auth";

const Sidebar = () => {
  const { currentUser } = useContext(AuthContext);

  const sideItems = [
    {
      name: "All Listings",
      link: "/listings",
    },
    ...(currentUser != null ? [
      {
        name: "My Listings",
        link: "/my_listings",
      }
    ] : []),
    {
      name: "Recent Sales",
      link: "/recent_sales",
    },
    {
      name: "Recent Listings",
      link: "/recent_listings",
    },
    ...(currentUser != null ? [
      {
        name: "Discussion Board",
        link: "/message_board",
      }
    ] : []),
    ...(currentUser != null ? [
      {
        name: "Discussions History",
        link: "/all_chat_history",
      }
    ] : []),
  ];

  return (
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
}

export default Sidebar;
