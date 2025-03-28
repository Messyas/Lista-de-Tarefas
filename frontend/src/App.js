import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/App.css"; // importa o CSS global do App
import "./styles/Global.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setTasks(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, [setTasks]);

  return (
    <>
      <div className="container">
        <h2 className="title">Lista de Tarefas</h2>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getTasks={getTasks} />
        <Grid setOnEdit={setOnEdit} tasks={tasks} setTasks={setTasks} />
      </div>
      <ToastContainer autoClose={3000} position={"bottom-center"} />
    </>
  );
}

export default App;
