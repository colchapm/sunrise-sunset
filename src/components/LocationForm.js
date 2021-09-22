import React from 'react';
import PropTypes from 'prop-types';

function LocationForm(props) {

  function submitSearch(event) {
    event.preventDefault();
    const searchTerm = event.target.location.value;
    props.onLocationSubmit(searchTerm);
  }

  return (
    <React.Fragment>
      <form onSubmit={submitSearch}>
        <input
          type="text"
          name="location"
          placeholder="Enter City Name" />

        <button type="submit">Submit</button>
      </form>
    </React.Fragment>
  )
}

export default LocationForm