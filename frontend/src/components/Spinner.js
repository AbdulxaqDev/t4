import React from "react";
import Spinner from 'react-bootstrap/Spinner';

export default function Loader() {
 return (
  <div style={{minHeight: "100%", minWidth: "100%", backgroundColor: "#282c34", display: "flex", justifyContent: "center", alignItems: "center"}}>
    <Spinner animation="grow" variant="light" />;
  </div>
 );
}
