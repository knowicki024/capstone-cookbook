import React from 'react';
import { Form, FormControl } from 'react-bootstrap';

function Search({ onSearch }) {
  return (
    <div className="search my-3">
      <Form className="d-flex" >
        <FormControl
          type="search"
          placeholder="Search Recipes or Categories"
          className="me-2"
          aria-label="Search"
          onChange={onSearch}
          // style={{ width: '100%' }} 
        />
      </Form>
    </div>
  );
}

export default Search;
