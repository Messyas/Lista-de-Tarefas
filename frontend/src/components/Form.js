import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "../styles/components/Form.css"; // importe o arquivo CSS

const Form = ({ getTasks, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const task = ref.current;
      task.nome.value = onEdit.nome;
      task.data_entrega.value = onEdit.data_entrega;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = ref.current;

    if (!task.nome.value || !task.data_entrega.value) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          nome: task.nome.value,
          data_entrega: task.data_entrega.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          nome: task.nome.value,
          data_entrega: task.data_entrega.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    task.nome.value = "";
    task.data_entrega.value = "";
    setOnEdit(null);
    getTasks();
  };

  return (
    <form ref={ref} onSubmit={handleSubmit} className="form-container">
      <div className="input-area">
        <label>Nome da Tarefa</label>
        <input name="nome" className="input" />
      </div>
      <div className="input-area">
        <label>Data de Entrega</label>
        <input name="data_entrega" type="date" className="input" />
      </div>
      <button type="submit" className="button">SALVAR</button>
    </form>
  );
};

export default Form;
