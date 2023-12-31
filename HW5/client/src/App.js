import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [user_id, setUser_id] = useState("");
  const [progress, setProgress] = useState("");
  const [workstyle, setWorkstyle] = useState("");

  const [ideaList, setIdeaList] = useState([]);

  const addIdea = () => {
    Axios.post("http://localhost:3001/create", {
      user_id: user_id,
      progress: progress,
      workstyle: workstyle,
    }).then(() => {
      setIdeaList([
        ...ideaList,
        {
          user_id: user_id,
          progress: progress,
          workstyle: workstyle,
        },
      ]);
    });
  };

  const getIdeas = () => {
    Axios.get("http://localhost:3001/ideas").then((response) => {
      setIdeaList(response.data);
    });
  };

  const updateIdeaProgress = (id) => {
    Axios.put("http://localhost:3001/update", { progress: progress, id: id }).then(
      (response) => {
        setIdeaList(
          ideaList.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  user_id: val.user_id,
                  workstyle: val.workstyle,
                  progress: progress,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteIdea = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setIdeaList(
        ideaList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="information">
        <label>User ID:</label>
        <input
          type="number"
          onChange={(event) => {
            setUser_id(event.target.value);
          }}
        />
        <label>Progress:</label>
        <select
          onChange={(event) => {
            setProgress(event.target.value);
          }}
        >
          <option value="new">New</option>
          <option value="on going">On Going</option>
          <option value="near end">Near End</option>
          <option value="want to extend the application">Want to Extend the Application</option>
        </select>
        <label>Workstyle:</label>
        <select
          onChange={(event) => {
            setWorkstyle(event.target.value);
          }}
        >
          <option value="remote">Remote</option>
          <option value="onsite">Onsite</option>
          <option value="hybrid">Hybrid</option>
        </select>
        <button onClick={addIdea}>Add Idea</button>
      </div>
      <div className="ideas">
        <button onClick={getIdeas}>Show Ideas</button>
        {ideaList.map((val, key) => {
          return (
            <div className="idea" key={key}>
              <div>
                <h3>User ID: {val.user_id}</h3>
                <h3>Progress: {val.progress}</h3>
                <h3>Workstyle: {val.workstyle}</h3>
              </div>
              <div>
                <select
                  onChange={(event) => {
                    setProgress(event.target.value);
                  }}
                >
                  <option value="new">New</option>
                  <option value="on going">On Going</option>
                  <option value="near end">Near End</option>
                  <option value="want to extend the application">Want to Extend the Application</option>
                </select>
                <button
                  onClick={() => {
                    updateIdeaProgress(val.id);
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    deleteIdea(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
