import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";

const SessionExpire = () => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>Page Not Found</Card.Title>
        <Card.Text> PLease Login or signin with useid and Password</Card.Text>
        <Link to="/home">Go to Home Page</Link>
      </Card.Body>
    </Card>
  );
};

export default SessionExpire;
