import "../assets/css/navbar.css";

export const Navbar = ({ setOpen, favoriteCount, setView, currentView }) => {
  return (
    <div className="navbar">
      <div className="nav-wrapper container">
        <span className="logo">Notes-App</span>

        <div className="nav-options">
          <div className="nav-icon" onClick={() => setOpen(true)}>
            <i className="fa-solid fa-plus"></i>
          </div>

          <div className="nav-icon favorite-count">
            <i className="fa-solid fa-star"></i> {favoriteCount}
          </div>

          <div className="view-buttons">
            <button
              className={currentView === "all" ? "active" : ""}
              onClick={() => setView("all")}
            >
              All Notes
            </button>
            <button
              className={currentView === "favorites" ? "active" : ""}
              onClick={() => setView("favorites")}
            >
              Favorites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
