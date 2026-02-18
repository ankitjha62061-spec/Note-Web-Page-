import { useState, useEffect } from "react";
import "./assets/css/app.css";
import { Navbar } from "./components/Navbar";
import { NoteCard } from "./components/NoteCard";
import { NoteDetails } from "./components/NoteDetails";
import { UpsertNote } from "./components/UpsertNote";
import { DeleteModal } from "./components/DeleteModal";

export default function App() {
  const [onCreateNote, setOnCreateNote] = useState(false);
  const [onViewNote, setOnViewNote] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [view, setView] = useState("all"); // "all" or "favorites"

  const handleCreateNote = (note) => {
    if (note) {
      setNotes([...notes, { ...note, favorite: false }]);
    }
  };

  const handleOnUpdate = (note) => {
    setCurrentNote(note);
    setOnCreateNote(true);
  };

  const handleUpdateNote = (note) => {
    if (note) {
      const updatedNotes = notes.map((n) =>
        n.id === note.id ? { ...note, favorite: n.favorite } : n
      );
      setNotes(updatedNotes);
      setCurrentNote(null);
    }
  };

  const handleDeleteNote = (noteId) => {
    setNoteToDelete(noteId);
    setDeleteVisible(true);
  };

  const confirmDelete = () => {
    setNotes(notes.filter((n) => n.id !== noteToDelete));
    setDeleteVisible(false);
    setNoteToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteVisible(false);
    setNoteToDelete(null);
  };

  const handleOnPreview = (note) => {
    setCurrentNote(note);
    setOnViewNote(true);
  };

  const toggleFavorite = (noteId) => {
    const updatedNotes = notes.map((n) =>
      n.id === noteId ? { ...n, favorite: !n.favorite } : n
    );
    setNotes(updatedNotes);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const filteredNotes = debouncedSearch
    ? notes.filter(
        (n) =>
          n.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          n.desc.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    : notes;

  const displayedNotes = filteredNotes.filter((n) =>
    view === "favorites" ? n.favorite : true
  );

  return (
    <div className="app">
      <Navbar
        setOpen={setOnCreateNote}
        favoriteCount={notes.filter((n) => n.favorite).length}
        setView={setView}
        currentView={view}
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

        <div className="notes-wrapper">
          {displayedNotes.length === 0 ? (
            <h2 className="Flex">
              {view === "favorites" ? "No Favorite Notes" : "No Notes Found"}
            </h2>
          ) : (
            displayedNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={handleDeleteNote}
                onUpdate={handleOnUpdate}
                onPreview={handleOnPreview}
                onToggleFavorite={toggleFavorite}
              />
            ))
          )}
        </div>

        {onCreateNote && (
          <UpsertNote
            note={currentNote}
            createNote={handleCreateNote}
            updateNote={handleUpdateNote}
            setOpen={setOnCreateNote}
          />
        )}

        {onViewNote && (
          <NoteDetails note={currentNote} setView={setOnViewNote} />
        )}

        <DeleteModal
          visible={deleteVisible}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      </div>
    </div>
  );
}
