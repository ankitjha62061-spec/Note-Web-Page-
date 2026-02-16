import { useState } from "react";
import "./assets/css/app.css";
import { Navbar } from "./components/Navbar";
import { NoteCard } from "./components/NoteCard";
import { NoteDetails } from "./components/NoteDetails";
import { UpsertNote } from "./components/UpsertNote";

export default function App() {
  const [onCreateNote, setOnCreateNote] = useState(false);
  const [onViewNote, setOnViewNote] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [search, setSearch] = useState("");
  // const [deleteId, setDeleteId] = useState(null);


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
  const confirmDelete = window.confirm("Are you sure you want to delete this note?");






  if (confirmDelete) {
    const filteredNotes = notes.filter((n) => n.id !== noteId);
    setNotes(filteredNotes);
  }
};







  const handleOnPreview = (note) => {
    setCurrentNote(note);
    setOnViewNote(true);
  };

  const filteredNotes = search
    ? notes.filter(
        (n) =>
          n.title.toLowerCase().includes(search.toLowerCase()) ||
          n.desc.toLowerCase().includes(search.toLowerCase())
      )
      : notes;



  return (
    <div className="app">
      <Navbar setOpen={setOnCreateNote} />
      <div className="wrapper container">



 <div className="search-wrapper">
  <input
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
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={handleDeleteNote}
              onUpdate={handleOnUpdate}
              onPreview={handleOnPreview}
            />
          ))}
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
      </div>
    </div>
  );
}
