import React from "react";
import "./sidebar.css";

function Sidebar(props) {
  const children = props.children;
  const title = props.title;

  return (
    <aside className="sideBar">
      <h2>{title}</h2>
      <ul className="children">{children}</ul>
    </aside>
  );
}

export default Sidebar;
