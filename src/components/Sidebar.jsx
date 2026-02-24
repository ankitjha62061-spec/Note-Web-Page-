import { useState } from "react";
import "../assets/css/sidebar.css";

export const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>

      <button className="menu-btn" onClick={() => setOpen(!open)}>
        ☰
      </button>


      {/* <div className={`sidebar ${open ? "open" : ""}`}> */}
       <div className={`sidebar ${open && "open"}`}>
        {/* <h2>My Menu</h2> */}
        <ul>
          <li>Home</li>
          <li>Notes</li>
          <li>Favorites</li>
          <li>Settings</li>
        </ul>
      </div>
    </>
  );
};