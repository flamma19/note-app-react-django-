import React, { useState, useEffect } from "react";
// useParams hook is used to pass params from url to a component
import { useParams, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = () => {
  /* Destructuring the id from the useParams hook. */
  const { id } = useParams();
  // we should use navigate to back to specific link after doing something.
  let navigate = useNavigate();
  const noteId = id;

  let [note, setNote] = useState(null);

  useEffect(() => {
    getNote(noteId);
  }, [noteId]);

  let getNote = async (noteId) => {
    if (noteId === "create") return;
    let response = await fetch(`/api/notes/${noteId}`);
    let data = await response.json();
    setNote(data);
  };

  let createNote = async () => {
    fetch("/api/notes/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      // to contain our text in json we should stringify it.
      body: JSON.stringify(note),
    });
  };

  let updateNote = async () => {
    fetch(`/api/notes/${noteId}/`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      // to contain our text in json we should stringify it.
      body: JSON.stringify(note),
    });
  };

  /**It's a function that deletes a note from the database and then navigates to the home page.**/
  let deleteNote = async () => {
    fetch(`/api/notes/${noteId}/`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    navigate("/");
  };

  // define the function to save note on get back to menu and if the body is null delete that.
  let handleSubmit = () => {
    if (noteId !== "create" && note.body === "") {
      deleteNote();
    } else if (noteId !== "create") {
      updateNote();
    } else if (noteId === "create" && note !== null) {
      createNote();
    }
    // updateNote();
    navigate("/");
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {noteId !== "create" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
        // be aware if you replace value with defaultValue it makes a bug when deleting single character notes.
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
