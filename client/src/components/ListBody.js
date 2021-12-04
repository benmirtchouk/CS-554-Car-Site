import React from "react";
import { Link } from 'react-router-dom';
import '../App.css';
import '../Carigs.css';

const ListBody = (props) => {

   let data = props.info.data;
   let page = props.info.page;
   //console.log(`Data.ID: ${data[0].id}`);
   //console.log(`Data.PAGE: ${page}`);

   const mapData = () => {
      // This creates a JSX element for every name in the list.
      if (data) {
         return (
            data.map(
               item =>
                  <div key={item.id} className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 align-items-center px-3">
                     <Link className="mlink" to={`/${page}/${item.id}`}>
                        <span className="mlink">{item.name}</span>
                     </Link>
                  </div>
            )
         );
      }
      else {
         return (<div><p>Body data goes here</p></div>);
      }
   };

   return (
      mapData()
   );
};

export default ListBody;
