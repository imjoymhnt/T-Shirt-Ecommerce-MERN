import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";

const {
  user: { role, id, name, email },
} = isAuthenticated();

const adminLeftSide = () => {
  return (
    <div className="card">
      <h4 className="card-header bg-dark text-white">Admin Dashboard</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <Link to="/admin/create/categories" className="nav-link text-success">
            Create Category
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/admin/create/product" className="nav-link text-success">
            Create Product
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/admin/products" className="nav-link text-success">
            Manage Products
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/admin/orders" className="nav-link text-success">
            Manage Orders
          </Link>
        </li>
      </ul>
    </div>
  );
};

const adminRightSide = () => {
  return (
    <div className="card mb-4">
      <h4 className="card-header">Admin Information</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <span className="badge bg-success mr-2">Name: </span> {name}
        </li>
        <li className="list-group-item">
          <span className="badge bg-success mr-2">Email:</span> {email}
        </li>
        <li className="list-group-item">
          <span className="badge bg-danger mr-2">Admin area</span>
        </li>
      </ul>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <Base
      title="Admin Dashboard"
      description="The Place where you can manage your Business"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-3">{adminLeftSide()}</div>
        <div className="col-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashboard;
