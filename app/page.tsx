'use client';

import { useState, FormEvent } from 'react';

export default function Page() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    area_interesse: '',
    habilidades: '',
    disponibilidade: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/voluntarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao cadastrar voluntário.');
      }

      setStatus('success');
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        area_interesse: '',
        habilidades: '',
        disponibilidade: ''
      });
    } catch (error: any) {
      console.error(error);
      setStatus('error');
      setErrorMessage(error.message);
    }
  };

  return (
    <main style={{ padding: '40px 20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Cadastro de Voluntário</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
        Preencha o formulário abaixo para se juntar à nossa equipe.
      </p>

      {status === 'success' && (
        <div style={{ padding: '15px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '5px', marginBottom: '20px' }}>
          Cadastro realizado com sucesso! Obrigado pelo interesse.
        </div>
      )}

      {status === 'error' && (
        <div style={{ padding: '15px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '5px', marginBottom: '20px' }}>
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label htmlFor="nome" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nome *</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }}
          />
        </div>

        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }}
          />
        </div>

        <div>
          <label htmlFor="telefone" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Telefone</label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }}
          />
        </div>

        <div>
          <label htmlFor="area_interesse" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Área de Interesse *</label>
          <select
            id="area_interesse"
            name="area_interesse"
            value={formData.area_interesse}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#fff', color: '#333' }}
          >
            <option value="" disabled>Selecione uma área</option>
            <option value="Comunicação">Comunicação</option>
            <option value="Logística">Logística</option>
            <option value="Eventos">Eventos</option>
          </select>
        </div>

        <div>
          <label htmlFor="habilidades" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Habilidades</label>
          <textarea
            id="habilidades"
            name="habilidades"
            value={formData.habilidades}
            onChange={handleChange}
            rows={3}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }}
            placeholder="Descreva suas habilidades..."
          />
        </div>

        <div>
          <label htmlFor="disponibilidade" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Disponibilidade</label>
          <input
            type="text"
            id="disponibilidade"
            name="disponibilidade"
            value={formData.disponibilidade}
            onChange={handleChange}
            placeholder="Ex: Segundas e Quartas à tarde"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }}
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            marginTop: '10px',
            padding: '12px',
            backgroundColor: status === 'loading' ? '#6c757d' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {status === 'loading' ? 'Enviando...' : 'Cadastrar Voluntário'}
        </button>
      </form>
    </main>
  );
}