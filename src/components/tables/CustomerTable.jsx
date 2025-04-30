// src/components/tables/CustomerTable.jsx
import React from 'react';
import PropTypes from 'prop-types'; // For type checking in JS

const CustomerTable = ({ customers }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        {/* ... rest of your table JSX ... */}
      </table>
    </div>
  );
};

CustomerTable.propTypes = {
  customers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      mobile: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired
    })
  ).isRequired
};

export default CustomerTable;