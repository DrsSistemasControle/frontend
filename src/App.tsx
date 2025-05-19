import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // vamos criar esse CSS

function App() {
  const [formData, setFormData] = useState({
    nomeTitular: '',
    cpf: '',
    dataNascimento: '',
    numeroCartao: '',
    validade: '',
    cvv: '',
    email: ''
  });

  const [resposta, setResposta] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/payments', formData);
      setResposta(response.data);
    } catch (error: any) {
      alert("Erro: " + (error.response?.data?.mensagem || error.message));
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Pagamento</h1>
        {["nomeTitular", "cpf", "dataNascimento", "numeroCartao", "validade", "cvv", "email"].map((field) => (
          <div className="form-group" key={field}>
            <label>{field}</label>
            <input
              type="text"
              name={field}
              value={(formData as any)[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <button type="submit">Enviar</button>
      </form>

      {resposta && (
        <div className="resposta">
          <h2>Resposta:</h2>
          <p><strong>Status:</strong> {resposta.status}</p>
          <p><strong>Mensagem:</strong> {resposta.mensagem}</p>
          <p><strong>Descrição:</strong> {resposta.dados?.descricao}</p>
          <p><strong>Nome:</strong> {resposta.dados?.nomeTitular}</p>
          <p><strong>Email:</strong> {resposta.dados?.email}</p>
        </div>
      )}
    </div>
  );
}

export default App;
