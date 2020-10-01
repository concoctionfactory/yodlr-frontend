import React, { useState, useEffect } from "react";
import { Jumbotron, ListGroup, ListGroupItem, Badge } from "reactstrap";
import { Link } from "react-router-dom";
import { apiGetUsers } from "../helper/api";

function Admin() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function getUsers() {
      let res = await apiGetUsers();
      setUsers(res.data);
    }
    getUsers();
  }, []);
  return (
    <div>
      <Jumbotron>
        <h1 className="display-3">Hello!</h1>
        <p className="lead">This is Yodlr.</p>
        <hr className="my-2" />
        <p>Here are our members.</p>
        <p className="lead">
          <Link className="btn btn-primary" to={`/signup`}>
            Sign Up
          </Link>
        </p>
      </Jumbotron>
      {users && (
        <ListGroup>
          {users.map((u) => (
            <Link to={`/users/${u.id}`} key={u.id}>
              <ListGroupItem className=" d-flex justify-content-between">
                {`${u.firstName} ${u.lastName}`}
                <Badge pill>{u.state}</Badge>
              </ListGroupItem>
            </Link>
          ))}
        </ListGroup>
      )}
    </div>
  );
}

export default Admin;
