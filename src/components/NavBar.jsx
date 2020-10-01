import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";

function NavBar() {
  return (
    <div className="mb-5">
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Yodlr</NavbarBrand>
      </Navbar>
    </div>
  );
}

export default NavBar;
