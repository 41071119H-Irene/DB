import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [user_id, setUser_id] = useState("");
  const [Progress, setProgress] = useState("");
  const [Workstyle, setWorkstyle] = useState("");
  const [title, setTitle] = useState("");
  const [Ideashare, setIdeashare] = useState([]);

  useEffect(() => {
    Load();
  }, []);

  async function Load() {
    const result = await axios.get("http://localhost:5038/HW3/server/GetNotes");
    setIdeashare(result.data);
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5038/HW3/server/AddNotes", {
        Progress: Progress,
        Workstyle: Workstyle,
        title: title,
      });
      alert("Idea Add Successfully");
      setUser_id("");
      setProgress("");
      setWorkstyle("");
      setTitle("");
      Load();
    } catch (err) {
      alert("Idea Add Failed");
    }
  }

  async function editIdea(Idea) {
    setUser_id(Idea.user_id);
    setProgress(Idea.Progress);
    setWorkstyle(Idea.Workstyle);
    setTitle(Idea.title);
  }

  async function DeleteIdea(user_id) {
    await axios.delete("http://localhost:5038/HW3/server/DeleteNotes/" + user_id);
    alert("Idea deleted Successfully");
    Load();
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.patch(
        "http://localhost:5038/HW3/server/UpdateNotes/" + user_id,
        {
          Progress: Progress,
          Workstyle: Workstyle,
          title: title,
        }
      );
      alert("Idea Updated");
      setUser_id("");
      setProgress("");
      setWorkstyle("");
      setTitle("");
      Load();
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <h1>Idea Here!</h1>
      <div className="container mt-4">
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="user_id"
              hidden
              value={user_id}
              onChange={(event) => {
                setUser_id(event.target.value);
              }}
            />
            <label>Progress</label>
            <input
              type="text"
              className="form-control"
              id="Progress"
              value={Progress}
              onChange={(event) => {
                setProgress(event.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label>Workstyle</label>
            <input
              type="text"
              className="form-control"
              id="Workstyle"
              value={Workstyle}
              onChange={(event) => {
                setWorkstyle(event.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>

          <div>
            <button className="btn btn-primary mt-4" onClick={save}>
              Add
            </button>
            <button className="btn btn-warning mt-4" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>

      <table className="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">User ID</th>
            <th scope="col">Progress</th>
            <th scope="col">Workstyle</th>
            <th scope="col">Title</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          {Ideashare.map((Idea) => (
            <tr key={Idea.user_id}>
              <td>{Idea.user_id}</td>
              <td>{Idea.Progress}</td>
              <td>{Idea.Workstyle}</td>
              <td>{Idea.title}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => editIdea(Idea)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => DeleteIdea(Idea.user_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
