import { useNavigate } from "react-router-dom";
import "../assets/css/card.css";

export const NoteCard = ({ onUpdate, onDelete, onToggleFavorite, note }) => {
  const navigate = useNavigate();

  return (
    <div className="note-card">
      <div className="note-card-wrapper">
        
        <h2 className="card-title" onClick={() => navigate(`/note/${note.id}`)}>
          {note.title}
        </h2>

        <div className="card-body">
          <p>{note.desc}</p>
        </div>

        <div className="card-footer">
          <span className="card-timeline">{note.createdAt}</span>

          <div className="card-actions">
            
            <div className="action-item" onClick={() => navigate(`/edit/${note.id}`)}>
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