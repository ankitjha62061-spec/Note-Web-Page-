import { Link, useNavigate, useLocation } from "react-router-dom"; 
import "../assets/css/navbar.css";

export const Navbar = ({ setOpen, favoriteCount }) => {
  const navigate = useNavigate();
  const location = useLocation(); // 

  return (
    <div className="navbar">
      <div className="nav-wrapper container">
        <Link to="/" className="logo">Notes-App</Link>

        <div className="nav-options">
          <div className="nav-icon" onClick={() => setOpen(true)}>
            <i className="fa-solid fa-plus"></i>
          </div>

          <div className="nav-icon favorite-count" onClick={() => navigate("/favorites")} style={{ cursor: "pointer" }}>
            <i className="fa-solid fa-star"></i> {favoriteCount}
          </div>

          <div className="view-buttons">
            <button
              className={location.pathname === "/" ? "active" : ""}
              onClick={() => navigate("/")}
            >
              All Notes
            </button>
            <button
              className={location.pathname === "/favorites" ? "active" : ""}
              onClick={() => navigate("/favorites")}
            >
              Favorites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};