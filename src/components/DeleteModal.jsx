import React from "react";
import "../assets/css/delete.css";

export const DeleteModal = ({ visible, onConfirm, onCancel }) => {
  if (!visible) return null;

  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal">
        <h3>Are you sure you want to delete this note?</h3>
        <div className="delete-actions">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="delete-btn" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
