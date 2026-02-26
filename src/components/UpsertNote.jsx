import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // ✅ added
import "../assets/css/upsert.css";
import { v4 as getID } from "uuid";

export const UpsertNote = ({ createNote, updateNote, notes }) => {
  const { id } = useParams();       
  const navigate = useNavigate();    

  const existingNote = id ? notes.find((n) => n.id === id) : null; 

  const [title, setTitle] = useState(existingNote ? existingNote.title : "");
  const [desc, setDesc] = useState(existingNote ? existingNote.desc : "");

  const clearInputs = () => {
    setTitle("");
    setDesc("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim() || !desc.trim()) return;

    if (existingNote) {
      updateNote({ ...existingNote, title, desc });
    } else {
      createNote({
        id: getID(),
        title,
        desc,
        createdAt: new Date().toDateString(),
      });
    }

    clearInputs();
    navigate("/"); //
  };

  return (
    <div className="upsert-note">
      <div className="upsert-wrapper">
        <div className="upsert-header">
          <h2 className="heading">
            {existingNote ? "Update Note" : "Add Note"}
          </h2>
          <div className="close-btn" onClick={() => navigate(-1)}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <form className="upsert-form" onSubmit={handleSubmit}>
          <input
            required
            type="text"
            maxLength={500}
            placeholder="Title"
            className="input-form"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            required
            className="textarea-form"
            maxLength={20000}
            placeholder="Enter your note"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>

          <div className="upsert-actions">
            <button type="button" className="clear-btn" onClick={clearInputs}>
              Clear
            </button>
            <button type="submit" className="save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};