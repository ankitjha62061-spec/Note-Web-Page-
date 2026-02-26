import { useState, useEffect, memo } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./assets/css/app.css";
import { Navbar } from "./components/Navbar";
import { NoteCard } from "./components/NoteCard";
import { NoteDetails } from "./components/NoteDetails";
import { UpsertNote } from "./components/UpsertNote";
import { DeleteModal } from "./components/DeleteModal";

const AllNotes = ({ notes, onDelete, onToggleFavorite }) => (
  <div className="notes-wrapper">
    {notes.length === 0 ? (
      <h2 className="Flex">No Notes Found</h2>
    ) : (
      notes.map((note) => (
        <NoteCard key={note.id} note={note} onDelete={onDelete} onToggleFavorite={onToggleFavorite} />
      ))
    )}
  </div>
);

const FavoriteNotes = ({ notes, onDelete, onToggleFavorite }) => {
  const favorites = notes.filter((n) => n.favorite);
  return (
    <div className="notes-wrapper">
      {favorites.length === 0 ? (
        <h2 className="Flex">No Favorite Notes</h2>
      ) : (
        favorites.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={onDelete} onToggleFavorite={onToggleFavorite} />
        ))
      )}
    </div>
  );
};

export default function App() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");           
  const [debouncedSearch, setDebouncedSearch] = useState(""); 
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("notes");
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);


  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);


  const filteredNotes = debouncedSearch
    ? notes.filter((n) =>
        n.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        n.desc.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    : notes;

  const addNote = (note) => {
    setNotes((prev) => [...prev, { ...note, favorite: false }]);
    navigate("/");
  };

  const editNote = (note) => {
    setNotes((prev) =>
      prev.map((n) => n.id === note.id ? { ...note, favorite: n.favorite } : n)
    );
    navigate("/");
  };

  const askDelete = (id) => {
    setNoteToDelete(id);
    setDeleteVisible(true);
  };

  const confirmDelete = () => {
    setNotes((prev) => prev.filter((n) => n.id !== noteToDelete));
    setDeleteVisible(false);
  };

  const toggleFavorite = (id) => {
    setNotes((prev) =>
      prev.map((n) => n.id === id ? { ...n, favorite: !n.favorite } : n)
    );
  };

  return (
    <div className="app">
      <Navbar
        setOpen={() => navigate("/create")}
        favoriteCount={notes.filter((n) => n.favorite).length}
      />

      <div className="wrapper container">

        <div className="search-wrapper">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="search-input"
            placeholder="Search"
          />
          <button className="search-btn">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <Routes>
          <Route path="/" element={<AllNotes 
          notes={filteredNotes} onDelete={askDelete} 
          onToggleFavorite={toggleFavorite} />} />


          <Route path="/favorites" element={<FavoriteNotes
         notes={filteredNotes} onDelete={askDelete}
         onToggleFavorite={toggleFavorite} />} />


          <Route path="/note/:id" element={<NoteDetails 
          notes={notes} />} />


          <Route path="/create" element={<UpsertNote createNote={addNote}
           updateNote={editNote} notes={notes} />} />


          <Route path="/edit/:id" element={<UpsertNote 
          createNote={addNote} updateNote={editNote} notes={notes} />} />
        </Routes>

        <DeleteModal
          visible={deleteVisible}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteVisible(false)}
        />
      </div>
    </div>
  );
}