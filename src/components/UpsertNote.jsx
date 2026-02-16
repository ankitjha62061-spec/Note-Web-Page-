import { useState } from "react";
import "../assets/css/upsert.css";
import { v4 as getID } from "uuid";

export const UpsertNote = ({ setOpen, note, createNote, updateNote }) => {
  const [title, setTitle] = useState(note ? note.title : "");
  const [desc, setDesc] = useState(note ? note.desc : "");

  const clearInputs = () => {
    setTitle("");
    setDesc("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim() || !desc.trim()) return;

    if (note) {
      //  Are You want to Update note
      updateNote({
        ...note,
        title,
        desc,
      });
    } else {
      // Create note
      createNote({
        id: getID(),
        title,
        desc,
        createdAt: new Date().toDateString(),
      });
    }

    clearInputs();
    setOpen(false);
  };

  return (
    <div className="upsert-note">
      <div className="upsert-wrapper">
        <div className="upsert-header">
          <h2 className="heading">
            {note ? "Are you want to update the note " : "Add Note"}
          </h2>
          <div className="close-btn" onClick={() => setOpen(false)}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>

        <form className="upsert-form" onSubmit={handleSubmit}>
          <input
            required
            type="text"
            maxLength={50}
            placeholder="Title"
            className="input-form"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            required
            className="textarea-form"
            maxLength={2000}
            placeholder="Enter your note"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>

          <div className="upsert-actions">
            <button
              type="button"
              className="clear-btn"
              onClick={clearInputs}
            >
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
