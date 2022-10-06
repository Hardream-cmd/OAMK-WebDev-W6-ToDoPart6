import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const URL = "http://localhost:3001/";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        alert(error.reponse.data.error);
      });
  }, []);

  function save() {
    const json = JSON.stringify({ description: task });
    axios
      .post(URL + "new", json, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const addedObject = JSON.parse(json);
        addedObject.id = response.data.idsetTasks((tasks) => [
          ...tasks,
          addedObject,
        ]);
        setTask("");
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  }

  function remove(id) {
    axios
      .delete(`${URL}delete/${id}`)
      .then(() => {
        const newListWithoutRemoved = tasks.filter((item) => item.id !== id);
        setTasks(newListWithoutRemoved);
      })
      .catch((error) => {
        alert(error.reponse.data.error);
      });
  }

  return (
    <div>
      <h3>My Tasks</h3>
      <form>
        <label>Add new</label>
        <input value={task} onChange={(e) => setTask(e.target.value)} />
        <button type="button" onClick={save}>
          Save
        </button>
      </form>
      <ol>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.description}
            <a href="#" onClick={() => remove(task.id)}>
              Delete
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
