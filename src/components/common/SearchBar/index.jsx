import React from 'react'
import PropTypes from 'prop-types'

const SearchBar = ({onSubmit, onChange, placeholder}) => 
  <form onSubmit={onSubmit}>
    <input
      onChange={onChange}
      placeholder={placeholder}
    />
    <input type="submit" />
  </form>


SearchBar.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
}

export default SearchBar