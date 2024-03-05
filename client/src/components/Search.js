import React from 'react';
import { Form, FormControl } from 'react-bootstrap';

function Search({ onSearch }) {
  return (
    <div className="search my-3 d-flex justify-content-center">
      <Form className="d-flex" style={{ maxWidth: '75%' }}>
        <FormControl
          type="search"
          placeholder="Search Recipes or Categories"
          className="me-2"
          aria-label="Search"
          onChange={onSearch}
          style={{ width: '100%' }} // Ensures FormControl takes full width of its parent
        />
      </Form>
    </div>
  );
}

export default Search;
