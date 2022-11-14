import React, { useState, useEffect } from "react";
import ListItem from "../components/ListItem";
import AddButton from "../components/AddButton";

const NotesListPage = () => {
  /* A hook that is used to manage state in functional components. */
  let [notes, setNotes] = useState([]);

  /* A hook that runs after the component is rendered. */
  useEffect(() => {
    getNotes();
  }, []);

  let getNotes = async () => {
    // because we need data to run after response , we should use await keyword before both of them.
    // we could define a proxy url in "package.json" and then don't add that in front off urls that we used.
    // here we replaced "http://127.0.0.1:8000/api/notes/" with "api/notes/" and add "http://127.0.0.1:8000" as a proxy.
    // look at package.json
    let response = await fetch("api/notes/");
    let data = await response.json();
    setNotes(data);
  };

  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Notes</h2>
        <p className="note-count">{notes.length}</p>
      </div>
      <div className="notes-list">
        {/* Mapping the notes array and passing each note to the ListItem component. */}
        {notes.map((note, index) => (
          // we should always pass a key. remember that.
          // always remember this boilerplate <tag key={} element={parameter that we pass whit map} />
          <ListItem key={index} note={note} />
        ))}
      </div>
      <AddButton />
    </div>
  );
};

export default NotesListPage;
