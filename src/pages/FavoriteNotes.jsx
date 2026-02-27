import { memo } from "react";
import { NoteCard } from "../components/NoteCard";

export const FavoriteNotes = memo(({ notes, onDelete, onToggleFavorite, onPreview }) => {
  const favorites = notes.filter((n) => n.favorite);
  return (
    <div className="notes-wrapper">
      {favorites.length === 0 ? (
        <h2 className="Flex">No Favorite Notes</h2>
      ) : (
        favorites.map((note) => (
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
  );
});