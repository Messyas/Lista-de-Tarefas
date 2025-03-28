import React from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import "../styles/components/Grid.css";

const Grid = ({ tasks, setTasks, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/" + id)
      .then(({ data }) => {
        const newArray = tasks.filter((task) => task.id !== id);
        setTasks(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <table className="grid-table">
      <thead>
        <tr>
          <th className="grid-th">Nome da Tarefa</th>
          <th className="grid-th only-web">Data de Entrega</th>
          <th className="grid-th"></th>
          <th className="grid-th"></th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((item, i) => (
          <tr key={i}>
            <td className="grid-td" style={{ width: "40%" }}>
              {item.nome}
            </td>
            <td className="grid-td only-web" style={{ width: "20%" }}>
              {new Date(item.data_entrega).toLocaleDateString("pt-BR")}
            </td>
            <td className="grid-td align-center" style={{ width: "5%" }}>
              <FaEdit onClick={() => handleEdit(item)} />
            </td>
            <td className="grid-td align-center" style={{ width: "5%" }}>
              <FaTrash onClick={() => handleDelete(item.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Grid;
