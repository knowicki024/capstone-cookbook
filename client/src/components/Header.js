import React from 'react';

import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';

function Header() {

  return(
    <div className="dm-serif-display-regular">
      <h1 className="header-background">Capstone Cookbook</h1>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/users">View Friends</Nav.Link>
              <Nav.Link href="/recipes">Add New Recipe</Nav.Link>
              <Nav.Link href="/meal_plans">Add New Meal Plan</Nav.Link>
              <Nav.Link href="/categories">Add Categories</Nav.Link>
              <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                      View Category Recipes
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                      <Dropdown.Item href="/categories/1">Appetizers</Dropdown.Item>
                      <Dropdown.Item href="/categories/2">Entrees</Dropdown.Item>
                      <Dropdown.Item href="/categories/3">Desserts</Dropdown.Item>
                  </Dropdown.Menu>
              </Dropdown>
          </Nav>
        </Container>  
      </Navbar>
    </div>
  )
}

export default Header;
