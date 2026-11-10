import React, { useState } from 'react';

export default function ManutencaoModelaco() {
  const [aba, setAba] = useState('os');
  const [equipamentos, setEquipamentos] = useState([]);
  const [pecas, setPecas] = useState([]);
  const [ordens, setOrdens] = useState([]);

  const [nomeEq, setNomeEq] = useState('');
  const [nomePeca, setNomePeca] = useState('');
  const [qtdPeca, setQtdPeca] = useState('');
  const [descOs, setDescOs] = useState('');
  const [equipOs, setEquipOs] = useState('');
  const [pecaOsId, setPecaOsId] = useState('');
  const [qtdUso, setQtdUso] = useState(1);

  // Adicionar Equipamento
  const adicionarEquipamento = (e) => {
    e.preventDefault();
    if (!nomeEq.trim()) return;
    setEquipamentos([...equipamentos, { id: Date.now(), nome: nomeEq }]);
    setNomeEq('');
  };

  // Adicionar Peça ao Estoque
  const adicionarPeca = (e) => {
    e.preventDefault();
    if (!nomePeca.trim()) return;
    setPecas([...pecas, { id: Date.now(), nome: nomePeca, qtd: parseInt(qtdPeca) || 0 }]);
    setNomePeca('');
    setQtdPeca('');
  };

  // Criar OS e dar baixa automática no estoque
  const criarOs = (e) => {
    e.preventDefault();
    if (!descOs.trim() || !equipOs.trim()) return;

    const qtdUsadaNum = parseInt(qtdUso) || 0;

    // Baixa automática no estoque se a peça foi vinculada
    if (pecaOsId) {
      setPecas(pecas.map(p => {
        if (p.id.toString() === pecaOsId.toString()) {
          return { ...p, qtd: Math.max(0, p.qtd - qtdUsadaNum) };
        }
        return p;
      }));
    }

    const novaOrdem = {
      id: Date.now(),
      equipamento: equipOs,
      descricao: descOs,
      status: 'Pendente',
      data: new Date().toLocaleDateString('pt-BR')
    };

    setOrdens([...ordens, novaOrdem]);
    setDescOs('');
    setEquipOs('');
    setPecaOsId('');
    setQtdUso(1);
  };

  // Concluir OS
  const concluirOs = (id) => {
    setOrdens(ordens.map(o => o.id === id ? { ...o, status: 'Concluído' } : o));
  };

  // Cálculos rápidos de Indicadores (KPIs)
  const totalOs = ordens.length;
  const osConcluidas = ordens.filter(o => o.status === 'Concluído').length;
  const taxaAtendimento = totalOs > 0 ? ((osConcluidas / totalOs) * 100).toFixed(1) : 0;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '16px', background: '#0f172a', color: '#f8fafc', minHeight: '100vh', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#38bdf8', fontSize: '20px', marginBottom: '4px', textAlign: 'center' }}>Manutenção Modelaço</h1>
      <p style={{ color: '#94a3b8', fontSize: '12px', textAlign: 'center', marginBottom: '16px' }}>Gestão de CMMS e Indicadores Operacionais</p>
      
      {/* Menu de Abas */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', justifyContent: 'center' }}>
        <button onClick={() => setAba('os')} style={{ padding: '8px 12px', background: aba === 'os' ? '#2563eb' : '#334155', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>Ordens de Serviço</button>
        <button onClick={() => setAba('equip')} style={{ padding: '8px 12px', background: aba === 'equip' ? '#2563eb' : '#334155', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>Equipamentos</button>
        <button onClick={() => setAba('estoque')} style={{ padding: '8px 12px', background: aba === 'estoque' ? '#2563eb' : '#334155', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>Estoque</button>
        <button onClick={() => setAba('kpi')} style={{ padding: '8px 12px', background: aba === 'kpi' ? '#2563eb' : '#334155', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>Indicadores</button>
      </div>

      {/* ABA DE ORDENS DE SERVIÇO */}
      {aba === 'os' && (
        <div>
          <h2 style={{ fontSize: '16px', color: '#38bdf8', marginBottom: '10px' }}>Abrir Nova OS</h2>
          <form onSubmit={criarOs} style={{ background: '#1e293b', padding: '12px', borderRadius: '8px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <input type="text" placeholder="Equipamento / Setor" value={equipOs} onChange={(e) => setEquipOs(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #475569', background: '#0f172a', color: '#fff', fontSize: '14px' }} />
            <textarea placeholder="Descrição da manutenção..." value={descOs} onChange={(e) => setDescOs(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #475569', background: '#0f172a', color: '#fff', fontSize: '14px', height: '60px' }} />
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <select value={pecaOsId} onChange={(e) => setPecaOsId(e.target.value)} style={{ flex: '1', padding: '8px', borderRadius: '4px', border: '1px solid #475569', background: '#0f172a', color: '#fff', fontSize: '12px' }}>
                <option value="">Vincular peça do estoque (Opcional)</option>
                {pecas.map(p => (
                  <option key={p.id} value={p.id}>{p.nome} (Disp: {p.qtd})</option>
                ))}
              </select>
              {pecaOsId && (
                <input type="number" min="1" placeholder="Qtd" value={qtdUso} onChange={(e) => setQtdUso(e.target.value)} style={{ width: '60px', padding: '8px', borderRadius: '4px', border: '1px solid #475569', background: '#0f172a', color: '#fff', fontSize: '12px' }} />
              )}
            </div>

            <button type="submit" style={{ padding: '10px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>Salvar OS e Baixar Estoque</button>
          </form>

          <h2 style={{ fontSize: '16px', color: '#38bdf8', marginBottom: '8px' }}>Lista de OS</h2>
          {ordens.length === 0 ? (
            <p style={{ color: '#94a3b8', fontSize: '13px' }}>Nenhuma Ordem de Serviço cadastrada.</p>
          ) : (
            ordens.map(o => (
              <div key={o.id} style={{ padding: '10px', background: '#1e293b', marginBottom: '8px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ fontSize: '14px', color: '#fff' }}>{o.equipamento}</strong>
                  <p style={{ fontSize: '13px', color: '#cbd5e1', margin: '2px 0' }}>{o.descricao}</p>
                  <span style={{ fontSize: '10px', color: '#64748b' }}>{o.data}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', background: o.status === 'Concluído' ? 'rgba(52, 211, 153, 0.2)' : 'rgba(245, 158, 11, 0.2)', color: o.status === 'Concluído' ? '#34d399' : '#f59e0b' }}>
                    {o.status}
                  </span>
                  {o.status === 'Pendente' && (
                    <button onClick={() => concluirOs(o.id)} style={{ padding: '4px 8px', background: '#059669', color: '#fff', border: 'none', borderRadius: '3px', fontSize: '10px', cursor: 'pointer' }}>Concluir</button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ABA DE EQUIPAMENTOS */}
      {aba === 'equip' && (
        <div>
          <h2 style={{ fontSize: '16px', color: '#38bdf8', marginBottom: '10px' }}>Cadastrar Equipamento</h2>
          <form onSubmit={adicionarEquipamento} style={{ background: '#1e293b', padding: '12px', borderRadius: '8px', marginBottom: '16px', display: 'flex', gap: '8px' }}>
            <input type="text" placeholder="Nome do equipamento..." value={nomeEq} onChange={(e) => setNomeEq(e.target.value)} style={{ padding: '8px', flex: '1', borderRadius: '4px', border: '1px solid #475569', background: '#0f172a', color: '#fff', fontSize: '14px' }} />
            <button type="submit" style={{ padding: '8px 14px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '14px', cursor: 'pointer' }}>Adicionar</button>
          </form>

          {equipamentos.length === 0 ? (
            <p style={{ color: '#94a3b8', fontSize: '13px' }}>Nenhum equipamento cadastrado.</p>
          ) : (
            equipamentos.map(eq => (
              <div key={eq.id} style={{ padding: '10px', background: '#1e293b', marginBottom: '6px', borderRadius: '6px', fontSize: '14px' }}>{eq.nome}</div>
            ))
          )}
        </div>
      )}

      {/* ABA DE ESTOQUE */}
      {aba === 'estoque' && (
        <div>
          <h2 style={{ fontSize: '16px', color: '#38bdf8', marginBottom: '10px' }}>Controle de Estoque</h2>
          <form onSubmit={adicionarPeca} style={{ background: '#1e293b', padding: '12px', borderRadius: '8px', marginBottom: '16px', display: 'flex', gap: '8px' }}>
            <input type="text" placeholder="Nome da peça..." value={nomePeca} onChange={(e) => setNomePeca(e.target.value)} style={{ padding: '8px', flex: '1', borderRadius: '4px', border: '1px solid #475569', background: '#0f172a', color: '#fff', fontSize: '14px' }} />
            <input type="number" placeholder="Qtd" value={qtdPeca} onChange={(e) => setQtdPeca(e.target.value)} style={{ padding: '8px', width: '60px', borderRadius: '4px', border: '1px solid #475569', background: '#0f172a', color: '#fff', fontSize: '14px' }} />
            <button type="submit" style={{ padding: '8px 14px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '14px', cursor: 'pointer' }}>Cadastrar</button>
          </form>

          {pecas.length === 0 ? (
            <p style={{ color: '#94a3b8', fontSize: '13px' }}>Estoque vazio.</p>
          ) : (
            pecas.map(p => (
              <div key={p.id} style={{ padding: '10px', background: '#1e293b', marginBottom: '6px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px' }}>{p.nome}</span>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: p.qtd <= 2 ? '#f87171' : '#34d399' }}>Qtd: {p.qtd}</span>
              </div>
            ))
          )}
        </div>
      )}

      {/* ABA DE INDICADORES */}
      {aba === 'kpi' && (
        <div>
          <h2 style={{ fontSize: '16px', color: '#38bdf8', marginBottom: '10px' }}>Indicadores de Desempenho</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
            <div style={{ background: '#1e293b', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
              <p style={{ fontSize: '11px', color: '#94a3b8', margin: '0 0 4px 0' }}>TOTAL DE OS</p>
              <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#38bdf8', margin: 0 }}>{totalOs}</p>
            </div>
            <div style={{ background: '#1e293b', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
              <p style={{ fontSize: '11px', color: '#94a3b8', margin: '0 0 4px 0' }}>CONCLUÍDAS</p>
              <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#34d399', margin: 0 }}>{osConcluidas}</p>
            </div>
          </div>
          <div style={{ background: '#1e293b', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ fontSize: '11px', color: '#94a3b8', margin: '0 0 4px 0' }}>TAXA DE ATENDIMENTO</p>
            <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#f59e0b', margin: 0 }}>{taxaAtendimento}%</p>
          </div>
        </div>
      )}
    </div>
  );
}
