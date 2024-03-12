import React from 'react';
import '../format/tables.css';

function Categories() {
  return (
    <div className="users_container">
    <div className="users_table">
      <table id="users_table">
        <thead>
          <tr className="head">
            <th className="titleUser"></th>
            <th className="titleUser">Categories</th>
            <th>
              <button id="btn_user">+New Category</button>
            </th>
            <th className="titleUser">
              <input className="searchUser" placeholder="Search User" />
              <button className="search_icon">&#128269;</button>
            </th>
          </tr>
          <tr className="header">
            <th>Title</th>
            <th>Description</th>
            <th>Author</th>
            <th>Category Edition</th>
          </tr>
        </thead>
        <tbody>
          <tr className="category_table_row"></tr>
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default Categories;
