import React from "react";
import { Link } from "react-router-dom";
function DashboardAdmin() {
  return (
    <div className="admindash">
      <div className="admindash__nav">
        <Link to="/admin/dashboard/viewmentor">View All Mentors</Link>
        <Link to="/admin/dashboard/viewstudent">View All Students</Link>
        <Link to="/admin/dashboard/category">Manage Categories</Link>
        <Link to="/admin/dashboard/courses">Manage Courses</Link>
      </div>
    </div>
  );
}



export default DashboardAdmin;