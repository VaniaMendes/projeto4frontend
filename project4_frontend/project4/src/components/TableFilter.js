import React, { useState } from "react";

function TableFilter({ onSortChange }) {
    const [sortCriteria, setSortCriteria] = useState("firstName");

  const handleSortChange = (event) => {
    const newSortCriteria = event.target.value;
    setSortCriteria(newSortCriteria);
    onSortChange(newSortCriteria);
  };
  return (
    <div>
      <div className="table_container">
        <select value={sortCriteria} onChange={handleSortChange}>
          <option value="firstName">Name</option>
          <option value="email">Email</option>
          <option value="phoneNumber">Phone</option>
        </select>
      </div>
    </div>
  );
}

export default TableFilter;
