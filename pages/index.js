import React, { useState } from 'react';

export default function CMMSApp() {
  const [aba, setAba] = useState('os');
  const [equipamentos, setEquipamentos] = useState([]);
  const [pecas, setPecas] = useState([]);
  const [ordens, setOrdens] = useState([]);

  const [nomeEq, setNomeEq] = useState('');
  const [nomePeca, setNomePeca] = useState('');
  const [qtdPeca, setQtdPeca] = useState('');
  const [descOs, setDescOs] = useState('');

  const adicionarEquipamento = (e) => {
    e.preventDefault();
    if (!nomeEq) return;
    setEquipamentos([...equipamentos, { id: Date.now(), nome: nomeEq }]);
    setNomeEq('');
  };

  const adicionarPeca = (e) => {
    e.preventDefault();
    if (!nomePeca) return;
    setPecas([...pecas, { id: Date.now(), nome: nomePeca, qtd: parseInt(qtdPeca) || 0 }]);
    setNomePeca('');
    setQtdPeca('');
  };

  const criarOs = (e) => {
    e.preventDefault();
    if (!descOs) return;
    setOrdens([...ordens, { id: Date.now(), descricao: descOs, status: 'Pendente' }]);
    setDescOs('');
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', background: '#0f172a', color: '#f8fafc', minHeight: '100vh' }}>
      <h1 style={{ color: '#38bdf8', fontSize: '24px', marginBottom: '20px' }}>Audita 9050 CMMS</h1>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => setAba('os')} style={{ padding: '10px', background: aba === 'os' ? '#2563eb' : '#334155', color: '#fff', border: 'none', borderRadius: '5px' }}>Ordens de Serviço</button>
        <button onClick={() => setAba('equip')} style={{ padding: '10px', background: aba === 'equip' ? '#2563eb' : '#334155', color: '#fff', border: 'none', borderRadius: '5px' }}>Equipamentos</button>
        <button onClick={() => setAba('estoque')} style={{ padding: '10px', background: aba === 'estoque' ? '#2563eb' : '#334155', color: '#fff', border: 'none', borderRadius: '5px' }}>Estoque</button>
      </div>

      {aba === 'os' && (
        <div>
          <h2>Ordens de Serviço</h2>
          <form onSubmit={criarOs} style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
            <input type="text" placeholder="Descrição do serviço..." value={descOs} onChange={(e) => setDescOs(e.target.value)} style={{ padding: '8px', flex: '1', borderRadius: '4px', border: '1px solid #475569', background: '#1e293b', color: '#fff' }} />
            <button type="submit" style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px' }}>Abrir OS</button>
          </form>
          <ul style={{ marginTop: '20px', listStyle: 'none', padding: 0 }}>
            {ordens.map(o => (
              <li key={o.id} style={{ padding: '10px', background: '#1e293b', marginBottom: '8px', borderRadius: '4px' }}>{o.descricao} - <span style={{ color: '#f59e0b' }}>{o.status}</span></li>
            ))}
          </ul>
        </div>
      )}

      {aba === 'equip' && (
        <div>
          <h2>Equipamentos</h2>
          <form onSubmit={adicionarEquipamento} style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
            <input type="text" placeholder="Nome do equipamento..." value={nomeEq} onChange={(e) => setNomeEq(e.target.value)} style={{ padding: '8px', flex: '1', borderRadius: '4px', border: '1px solid #475569', background: '#1e293b', color: '#fff' }} />
            <button type="submit" style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px' }}>Adicionar</button>
          </form>
          <ul style={{ marginTop: '20px', listStyle: 'none', padding: 0 }}>
            {equipamentos.map(eq => (
              <li key={eq.id} style={{ padding: '10px', background: '#1e293b', marginBottom: '8px', borderRadius: '4px' }}>{eq.nome}</li>
            ))}
          </ul>
        </div>
      )}

      {aba === 'estoque' && (
        <div>
          <h2>Estoque</h2>
          <form onSubmit={adicionarPeca} style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
            <input type="text" placeholder="Nome da peça..." value={nomePeca} onChange={(e) => setNomePeca(e.target.value)} style={{ padding: '8px', flex: '1', borderRadius: '4px', border: '1px solid #475569', background: '#1e293b', color: '#fff' }} />
            <input type="number" placeholder="Qtd" value={qtdPeca} onChange={(e) => setQtdPeca(e.target.value)} style={{ padding: '8px', width: '80px', borderRadius: '4px', border: '1px solid #475569', background: '#1e293b', color: '#fff' }} />
            <button type="submit" style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px' }}>Cadastrar</button>
          </form>
          <ul style={{ marginTop: '20px', listStyle: 'none', padding: 0 }}>
            {pecas.map(p => (
              <li key={p.id} style={{ padding: '10px', background: '#1e293b', marginBottom: '8px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between' }}>
                <span>{p.nome}</span>
                <span style={{ color: '#34d399' }}>Qtd: {p.qtd}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}



 
 


         
     
     

 
            
           
              
          
            
       
                    
         
