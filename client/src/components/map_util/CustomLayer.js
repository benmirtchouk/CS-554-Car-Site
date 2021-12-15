// import React, { useEffect, useRef } from "react";
// import { useLeaflet } from "react-leaflet"

// // https://stackoverflow.com/a/61667303
// export default function CustomLayer(props) {
//   const groupRef = useRef(null);
//   const { markers } = props;
//   const mapContext = useLeaflet();
//   const { map} = mapContext; //get map instance

//   useEffect(() => {
//     const group = groupRef.current.leafletElement; //get leaflet.markercluster instance  
//     map.fitBounds(group.getBounds());  //zoom to cover visible markers
//   }, []);

//   return (
//     <MarkerClusterGroup ref={groupRef} showCoverageOnHover={false}>
//       {markers.map(({ fillColor, position, id }) => (
//         <CircleMarker
//           fillColor={fillColor}
//           radius={10}
//           fillOpacity={1}
//           key={id}
//           center={position}
//         />
//       ))}
//     </MarkerClusterGroup>
//   );
// }