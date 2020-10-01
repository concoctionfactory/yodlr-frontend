import React, { useState, useEffect } from "react";
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { useParams, Link } from "react-router-dom";
import { apiGetUser } from "../helper/api";

function Users() {
  const id = Number(useParams().id);
  const [user, setUser] = useState([]);
  useEffect(() => {
    async function getUser() {
      setUser("loading");
      try {
        let res = await apiGetUser(id);
        setUser(res.data);
      } catch (error) {
        setUser("notFound");
      }
    }
    getUser();
  }, [id]);

  if (user === "loading") {
    return <div>loading</div>;
  }
  if (user === "notFound") {
    return <div>notFound</div>;
  }
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle>Member info</CardTitle>
        </CardBody>
        <CardBody>
          <CardTitle>{`${user.firstName} ${user.lastName}`}</CardTitle>
          <CardSubtitle>{user.email}</CardSubtitle>
          <CardText>{user.state}</CardText>
          <p className="lead">
            <Link className="btn btn-primary" to={`/users/${id}/edit`}>
              edit
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}

export default Users;
