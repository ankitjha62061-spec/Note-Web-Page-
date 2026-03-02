import { createContext, useContext, useState, useEffect } from "react";

const NoteContext = createContext(); 

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("notes");
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  


  const addNote = (note) => setNotes((prev) => [...prev, { ...note, favorite: false }]);
  const editNote = (note) => setNotes((prev) => prev.map((n) => n.id === note.id ? { ...note, favorite: n.favorite } : n));
  const deleteNote = (id) => setNotes((prev) => prev.filter((n) => n.id !== id));
  const toggleFavorite = (id) => setNotes((prev) => prev.map((n) => n.id === id ? { ...n, favorite: !n.favorite } : n));

  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, toggleFavorite }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => useContext(NoteContext); 