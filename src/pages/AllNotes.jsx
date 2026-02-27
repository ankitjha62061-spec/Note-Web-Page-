import { memo } from "react";
import { NoteCard } from "../components/NoteCard";

export const AllNotes = memo(({ notes, onDelete, onToggleFavorite, onPreview }) => (
  <div className="notes-wrapper">
    {notes.length === 0 ? (
      <h2 className="Flex">No Notes Found</h2>
    ) : (
      notes.map((note) => (
        <NoteCard 
          key={note.id} 
          note={note} 
          onDelete={onDelete} 
          onToggleFavorite={onToggleFavorite}
          onPreview={onPreview} // 
        />
      ))
    )}
  </div>
));