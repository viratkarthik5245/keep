import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <nav className="sidebar">
      <Link to="/">All Notes</Link>
      <Link to="/archived">Archived Notes</Link>
      <Link to="/trash">Trash</Link>
      <Link to="/reminders">Reminders</Link>
    </nav>
  );
}

export default Sidebar;
