import "../assets/css/navbar.css";

export const Navbar = ({ setOpen }) => {
  return (
    <div className="navbar">
      <div className="nav-wrapper container">
        <span className="logo">Notes-App</span>

        <div className="nav-options">
          <div className="nav-icon" onClick={() => setOpen(true)}>
            <i className="fa-solid fa-plus"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

