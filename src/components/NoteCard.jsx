import "../assets/css/card.css";

export const NoteCard = ({ onPreview, onUpdate, onDelete, onToggleFavorite, note }) => {
  return (
    <div className="note-card">
      <div className="note-card-wrapper">
        <h2 className="card-title" onClick={() => onPreview(note)}>
          {note.title}
        </h2>

        <div className="card-body">
          <p>{note.desc}</p>
        </div>

        <div className="card-footer">
          <span className="card-timeline">{note.createdAt}</span>

          <div className="card-actions">
            <div className="action-item" onClick={() => onUpdate(note)}>
              <i className="fa-solid fa-pen-to-square edit"></i>
            </div>

            <div className="action-item" onClick={() => onDelete(note.id)}>
              <i className="fa-solid fa-trash-can delete"></i>
            </div>

            <div className="action-item" onClick={() => onToggleFavorite(note.id)}>
              {note.favorite ? (
                <i className="fa-solid fa-star favorite"></i>
              ) : (
                <i className="fa-regular fa-star favorite"></i>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
