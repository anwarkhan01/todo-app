import React from "react";

const EditButton = ({ onclick, text }) => {
  return (
    <button onClick={onclick} className="edit-button">
      Edit
    </button>
  );
};
const SaveButton = ({ onclick, text }) => {
  return (
    <button onClick={onclick} className="save-button">
      Save
    </button>
  );
};

const DeleteButton = ({ onclick }) => {
  return (
    <button onClick={onclick} className="delete-button">
      Delete
    </button>
  );
};

export { EditButton, DeleteButton, SaveButton };
