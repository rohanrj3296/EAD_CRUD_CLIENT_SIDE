import React, { useState } from "react";
import "./App.css";
import Axios from 'axios';

function App() {
  const [name, setName] = useState("");
  const [theme, setTheme] = useState("");
  const [documentary, setDocumentary] = useState(false);
  const [data, setData] = useState(null);

  const submitMovie = () => {
    Axios.post('http://127.0.0.1:9000/movieController', {
      name: name,
      theme: theme,
      documentary: documentary
    }).then(() => {
      alert("Movie added successfully");
    }).catch((error) => {
      alert("Error adding movie: " + error);
    });
  };

  const retrieveData = () => {
    Axios.get('http://127.0.0.1:9000/movieController')
      .then((response) => {
        setData(response.data);
      }).catch((error) => {
        alert("Error retrieving movies: " + error);
      });
  };

  return (
    <div className="App">
      <h1>CRUD Application Demo</h1>
      <div className="information">
        <label><b>Movie Name</b></label>
        <input
          type="text"
          name="name"
          onChange={(e) => { setName(e.target.value); }} required />
        <label><b>Theme</b></label>
        <input
          type="text"
          name="theme"
          onChange={(e) => { setTheme(e.target.value); }} required />
        <label><b>Documentary</b></label>
        <input
          type="checkbox"
          name="documentary"
          onChange={(e) => { setDocumentary(e.target.checked); }} />
        <button onClick={submitMovie}><b>Submit</b></button>
      </div>
      <div className="actions">
        <button onClick={retrieveData}><b>Retrieve</b></button>
      </div>
      <div className="data-display">
        {data && data.map((item, index) => (
          <div key={index}>
            <p><b>Name:</b> {item.name}</p>
            <p><b>Theme:</b> {item.theme}</p>
            <p><b>Documentary:</b> {item.documentary ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
