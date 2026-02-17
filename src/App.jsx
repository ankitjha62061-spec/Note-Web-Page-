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

  const handleCreateNote = (note) => {
    if (note) {
      setNotes([...notes, note]);
    }
  };

  const handleOnUpdate = (note) => {
    setCurrentNote(note);
    setOnCreateNote(true);
  };

  const handleUpdateNote = (note) => {
    if (note) {
      const updatedNotes = notes.map((n) =>
        n.id === note.id ? note : n
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
    const filteredNotes = notes.filter((n) => n.id !== noteToDelete);
    setNotes(filteredNotes);
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

  return (
    <div className="app">
      <Navbar setOpen={setOnCreateNote} />

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
          {notes.length === 0 ? (
            <h2 className="Flex">No Notes Yet. Create One!</h2>
          ) : filteredNotes.length === 0 ? (
            <h2 className="code-wipe">No Notes Found</h2>
          ) : (
            filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={handleDeleteNote}
                onUpdate={handleOnUpdate}
                onPreview={handleOnPreview}
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
          <NoteDetails
            note={currentNote}
            setView={setOnViewNote}
          />
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
