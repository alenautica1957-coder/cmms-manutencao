import React, { useState } from 'react';
import { ClipboardList, Wrench, Package, BarChart3, Plus, CheckCircle, AlertTriangle } from 'lucide-react';

export default function CMMSApp() {
  const [activeTab, setActiveTab] = useState('os');
  
  // Estados principais
  const [equipamentos, setEquipamentos] = useState([]);
  const [pecas, setPecas] = useState([]);
  const [ordens, setOrdens] = useState([]);

  // Inputs de formulários
  const [novoEquip, setNovoEquip] = useState('');
  const [novaPeca, setNovaPeca] = useState('');
  const [qtdPeca, setQtdPeca] = useState('');
  
  const [novaOsEquip, setNovaOsEquip] = useState('');
  const [novaOsDesc, setNovaOsDesc] = useState('');
  const [novaOsPecaId, setNovaOsPecaId] = useState('');
  const [novaOsQtdUsada, setNovaOsQtdUsada] = useState(1);

  // Adicionar Equipamento
  const handleAddEquip = (e) => {
    e.preventDefault();
    if (!novoEquip.trim()) return;
    setEquipamentos([...equipamentos, { id: Date.now(), nome: novoEquip }]);
    setNovoEquip('');
  };

  // Adicionar Peça ao Estoque
  const handleAddPeca = (e) => {
    e.preventDefault();
    if (!novaPeca.trim()) return;
    setPecas([...pecas, { id: Date.now(), nome: novaPeca, qtd: parseInt(qtdPeca) || 0 }]);
    setNovaPeca('');
    setQtdPeca('');
  };

  // Criar Ordem de Serviço com baixa no estoque
  const handleAddOs = (e) => {
    e.preventDefault();
    if (!novaOsEquip.trim()) return;

    const qtdUsadaNum = parseInt(novaOsQtdUsada) || 0;

    if (novaOsPecaId) {
      setPecas(pecas.map(p => {
        if (p.id.toString() === novaOsPecaId.toString()) {
          return { ...p, qtd: Math.max(0, p.qtd - qtdUsadaNum) };
        }
        return p;
      }));
    }

    const novaOrdem = {
      id: Date.now(),
      equipamento: novaOsEquip,
      descricao: novaOsDesc,
      status: 'Pendente',
      data: new Date().toLocaleDateString('pt-BR')
    };

    setOrdens([...ordens, novaOrdem]);
    setNovaOsEquip('');
    setNovaOsDesc('');
    setNovaOsPecaId('');
    setNovaOsQtdUsada(1);
  };

  // Concluir OS (Muda status para Concluído)
  const concluirOs = (id) => {
    setOrdens(ordens.map(os => os.id === id ? { ...os, status: 'Concluído' } : os));
  };

  // Cálculo de Indicadores simples baseados no volume cadastrado
  const totalOs = ordens.length;
  const osConcluidas = ordens.filter(os => os.status === 'Concluído').length;
  const osPendentes = totalOs - osConcluidas;
  const taxaConclusao = totalOs > 0 ? ((osConcluidas / totalOs) * 100).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar de Navegação */}
      <aside className="w-full md:w-64 bg-slate-800 border-r border-slate-700 p-4 space-y-2">
        <h1 className="text-xl font-bold text-blue-400 mb-6 px-2">Audita 9050 CMMS</h1>
        
        <button
          onClick={() => setActiveTab('os')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
            activeTab === 'os' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          <ClipboardList className="h-5 w-5" />
          <span>Ordens de Serviço</span>
        </button>

        <button
          onClick={() => setActiveTab('equipamentos')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
            activeTab === 'equipamentos' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          <Wrench className="h-5 w-5" />
          <span>Equipamentos</span>
        </button>

        <button
          onClick={() => setActiveTab('estoque')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
            activeTab === 'estoque' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          <Package className="h-5 w-5" />
          <span>Estoque / Peças</span>
        </button>

        <button
          onClick={() => setActiveTab('indicadores')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
            activeTab === 'indicadores' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          <BarChart3 className="h-5 w-5" />
          <span>Indicadores & KPIs</span>
        </button>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-6 overflow-y-auto">
        {activeTab === 'os' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Ordens de Serviço</h2>
            
            <form onSubmit={handleAddOs} className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-4">
              <h3 className="font-semibold text-blue-400">Abrir Nova OS</h3>
              <input
                type="text"
                placeholder="Equipamento / Setor"
                value={novaOsEquip}
                onChange={(e) => setNovaOsEquip(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-100"
              />
              <textarea
                placeholder="Descrição do problema ou manutenção..."
                value={novaOsDesc}
                onChange={(e) => setNovaOsDesc(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-100"
              />
              <div className="flex gap-2">
                <select
                  value={novaOsPecaId}
                  onChange={(e) => setNovaOsPecaId(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-100"
                >
                  <option value="">Vincular peça do estoque (Opcional)</option>
                  {pecas.map(p => (
                    <option key={p.id} value={p.id}>{p.nome} (Disp: {p.qtd})</option>
                  ))}
                </select>
                {novaOsPecaId && (
                  <input
                    type="number"
                    min="1"
                    placeholder="Qtd"
                    value={novaOsQtdUsada}
                    onChange={(e) => setNovaOsQtdUsada(e.target.value)}
                    className="w-20 bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-100"
                  />
                )}
              </div>
              <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm font-medium w-full">
                Salvar OS e Baixar Estoque
              </button>
            </form>

            <div className="space-y-3">
              {ordens.length === 0 ? (
                <p className="text-slate-400 text-sm">Nenhuma OS cadastrada.</p>
              ) : (
                ordens.map(os => (
                  <div key={os.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-slate-100">{os.equipamento}</h4>
                      <p className="text-sm text-slate-300">{os.descricao}</p>
                      <span className="text-xs text-slate-500">Data: {os.data}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={text-xs px-2.5 py-1 rounded-full font-medium ${os.status === 'Concluído' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}}>
                        {os.status}
                      </span>
                      {os.status === 'Pendente' && (
                        <button onClick={() => concluirOs(os.id)} className="bg-emerald-600 hover:bg-emerald-500 text-white p-1.5 rounded text-xs">
                          Concluir
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'equipamentos' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Cadastro de Equipamentos</h2>
            <form onSubmit={handleAddEquip} className="flex gap-2">
              <input
                type="text"
                placeholder="Nome do equipamento..."
                value={novoEquip}
                onChange={(e) => setNovoEquip(e.target.value)}
                className="flex-1 bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-100"
              />
              <button type="submit" className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-sm font-medium">
                Adicionar
              </button>
            </form>

            <div className="bg-slate-800 rounded-xl border border-slate-700 divide-y divide-slate-700">
              {equipamentos.length === 0 ? (
                <p className="p-4 text-slate-400 text-sm">Nenhum equipamento cadastrado.</p>
              ) : (
                equipamentos.map(eq => (
                  <div key={eq.id} className="p-4 flex justify-between items-center">
                    <span className="font-medium">{eq.nome}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'estoque' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Controle de Estoque e Peças</h2>
            <form onSubmit={handleAddPeca} className="flex gap-2">
              <input
                type="text"
                placeholder="Nome da peça..."
                value={novaPeca}
                onChange={(e) => setNovaPeca(e.target.value)}
                className="flex-1 bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-100"
              />
              <input
                type="number"
                placeholder="Qtd"
                value={qtdPeca}
                onChange={(e) => setQtdPeca(e.target.value)}
                className="w-24 bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-100"
              />
              <button type="submit" className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-sm font-medium">
                Cadastrar
              </button>
            </form>

            <div className="bg-slate-800 rounded-xl border border-slate-700 divide-y divide-slate-700">
              {pecas.length === 0 ? (
                <p className="p-4 text-slate-400 text-sm">Estoque vazio.</p>
              ) : (
                pecas.map(p => (
                  <div key={p.id} className="p-4 flex justify-between items-center">
                    <span className="font-medium">{p.nome}</span>
                    <span className={px-2.5 py-1 rounded text-xs font-bold ${p.qtd <= 2 ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}}>
                      Qtd: {p.qtd}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'indicadores' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Indicadores de Manutenção (KPIs)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <p className="text-xs text-slate-400 uppercase font-semibold">Total de OS</p>
                <p className="text-3xl font-bold text-blue-400 mt-2">{totalOs}</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <p className="text-xs text-slate-400 uppercase font-semibold">OS Concluídas</p>
                <p className="text-3xl font-bold text-emerald-400 mt-2">{osConcluidas}</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <p className="text-xs text-slate-400 uppercase font-semibold">Taxa de Atendimento</p>
                <p className="text-3xl font-bold text-amber-400 mt-2">{taxaConclusao}%</p>
              </div>
            </div>

            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-2">
              <h3 className="font-semibold text-blue-400">Resumo Operacional</h3>
              <p className="text-sm text-slate-300">Equipamentos cadastrados: <strong>{equipamentos.length}</strong></p>
              <p className="text-sm text-slate-300">Itens diferentes em estoque: <strong>{pecas.length}</strong></p>
              <p className="text-sm text-slate-300">Ordens pendentes de fechamento: <strong>{osPendentes}</strong></p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
   
   
     
