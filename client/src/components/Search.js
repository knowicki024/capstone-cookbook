import React from 'react';
import { Form, FormControl } from 'react-bootstrap';

function Search({ onSearch }) {
  return (
    <div className="search my-3"> {/* Add margin to the top and bottom */}
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search Recipes or Categories"
          className="me-2" // Adds margin to the right of the search bar
          aria-label="Search"
          onChange={onSearch}
        />
      </Form>
    </div>
  );
}

export default Search;
