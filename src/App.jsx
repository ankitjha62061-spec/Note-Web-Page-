import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./assets/css/app.css";
import { Navbar } from "./components/Navbar";
import { DeleteModal } from "./components/DeleteModal";
import { AllNotes } from "./pages/AllNotes";
import { FavoriteNotes } from "./pages/FavoriteNotes";
import { NoteDetails } from "./pages/NoteDetails";
import { UpsertNote } from "./pages/UpsertNote";
import { useNotes } from "./context/NoteContext"; 

export default function App() {
  const { notes, addNote, editNote, deleteNote, toggleFavorite } = useNotes();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [onViewNote, setOnViewNote] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const navigate = useNavigate();

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

  const askDelete = (id) => {
    setNoteToDelete(id);
    setDeleteVisible(true);
  };

  const confirmDelete = () => {
    deleteNote(noteToDelete); 
    setDeleteVisible(false);
  };

  const handlePreview = (note) => {
    setCurrentNote(note);
    setOnViewNote(true);
  };

  const handleAddNote = (note) => {
    addNote(note); // 
    navigate("/");
  };

  const handleEditNote = (note) => {
    editNote(note); // 
    navigate("/");
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
          <Route path="/" element={<AllNotes notes={filteredNotes} onDelete={askDelete} onToggleFavorite={toggleFavorite} onPreview={handlePreview} />} />
          <Route path="/favorites" element={<FavoriteNotes notes={filteredNotes} onDelete={askDelete} onToggleFavorite={toggleFavorite} onPreview={handlePreview} />} />
          <Route path="/create" element={<UpsertNote createNote={handleAddNote} updateNote={handleEditNote} notes={notes} />} />
          <Route path="/edit/:id" element={<UpsertNote createNote={handleAddNote} updateNote={handleEditNote} notes={notes} />} />
        </Routes>

        {onViewNote && (
          <NoteDetails note={currentNote} setView={setOnViewNote} />
        )}

        <DeleteModal
          visible={deleteVisible}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteVisible(false)}
        />
      </div>
    </div>
  );
}