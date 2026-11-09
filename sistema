import React, { useState } from 'react';
import { 
  Wrench, ShieldAlert, Package, ClipboardList, BarChart3, 
  Users, CheckCircle2, AlertTriangle, Plus, Search, Filter, ArrowRight 
} from 'lucide-react';

export default function CMMSApp() {
  const [role, setRole] = useState('admin');
  const [activeTab, setActiveTab] = useState('os');

  const [workOrders, setWorkOrders] = useState([
    { id: 'OS-101', equipment: 'Torno CNC Romi Centur 20', sector: 'Usinagem', priority: 'Alta', status: 'Em Andamento', technician: 'Carlos Silva', mttr: '2.5h' },
    { id: 'OS-102', equipment: 'Prensa Hidráulica 50T', sector: 'Prensas', priority: 'Crítica', status: 'Aberta', technician: 'Pendente', mttr: '-' },
    { id: 'OS-103', equipment: 'Esteira Transportadora 02', sector: 'Montagem', priority: 'Média', status: 'Concluída', technician: 'João Santos', mttr: '1.2h' },
  ]);

  const [inventory, setInventory] = useState([
    { id: 'P-01', name: 'Correia em V A-48', stock: 12, min: 5, location: 'Almoxarifado A' },
    { id: 'P-02', name: 'Filtro de Óleo Hidráulico', stock: 3, min: 4, location: 'Almoxarifado B' },
    { id: 'P-03', name: 'Contator 24VCC 9A', stock: 8, min: 2, location: 'Elétrica' },
  ]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Wrench className="h-8 w-8 text-blue-400" />
          <div>
            <h1 className="text-xl font-bold tracking-wider">AUDITA 9050</h1>
            <p className="text-xs text-slate-400">CMMS Industrial Inteligente & RBAC</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-xs text-slate-400">Perfil Ativo:</span>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            className="bg-slate-700 border border-slate-600 rounded px-3 py-1 text-sm font-medium text-blue-300 focus:outline-none"
          >
            <option value="admin">Administrador (Master)</option>
            <option value="gestor">Gestor de Setor</option>
            <option value="tecnico">Mecânico / Técnico</option>
            <option value="operador">Operador (Checklist)</option>
          </select>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 bg-slate-800/50 border-r border-slate-700 min-h-[calc(100vh-73px)] p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('os')}
            className={w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'os' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700'}}
          >
            <ClipboardList className="h-5 w-5" />
            <span>Ordens de Serviço</span>
          </button>
          <button 
            onClick={() => setActiveTab('estoque')}
            className={w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'estoque' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700'}}
          >
            <Package className="h-5 w-5" />
            <span>Controle de Estoque</span>
          </button>
          <button 
            onClick={() => setActiveTab('kpi')}
            className={w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'kpi' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700'}}
          >
            <BarChart3 className="h-5 w-5" />
            <span>KPIs (MTTR / MTBF)</span>
          </button>
        </aside>

        <main className="flex-1 p-8">
          {activeTab === 'os' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Gestão de Ordens de Serviço (OS)</h2>
                {(role === 'admin' || role === 'gestor') && (
                  <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Nova OS</span>
                  </button>
                )}
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-lg">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-750 border-b border-slate-700 text-xs text-slate-400 uppercase">
                      <th className="p-4">ID</th>
                      <th className="p-4">Equipamento</th>
                      <th className="p-4">Setor</th>
                      <th className="p-4">Prioridade</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Técnico</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700 text-sm">
                    {workOrders.map((os) => (
                      <tr key={os.id} className="hover:bg-slate-750">
                        <td className="p-4 font-mono text-blue-400">{os.id}</td>
                        <td className="p-4 font-medium">{os.equipment}</td>
                        <td className="p-4 text-slate-300">{os.sector}</td>
                        <td className="p-4"><span className="px-2 py-1 rounded text-xs bg-amber-500/20 text-amber-300">{os.priority}</span></td>
                        <td className="p-4"><span className="px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-300">{os.status}</span></td>
                        <td className="p-4 text-slate-300">{os.technician}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'estoque' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Almoxarifado & Baixa Automática</h2>
              <div className="grid grid-cols-3 gap-6">
                {inventory.map((item) => (
                  <div key={item.id} className="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-mono text-slate-400">{item.id}</span>
                      <span className={text-xs px-2 py-0.5 rounded ${item.stock <= item.min ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}}>
                        {item.stock <= item.min ? 'Estoque Baixo' : 'Normal'}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
                    <p className="text-sm text-slate-400 mt-1">Local: {item.location}</p>
                    <div className="mt-4 flex justify-between items-center pt-4 border-t border-slate-700">
                      <span className="text-2xl font-bold text-blue-400">{item.stock} un</span>
                      <span className="text-xs text-slate-500">Mín: {item.min}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'kpi' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Indicadores de Desempenho (Confiabilidade)</h2>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl">
                  <p className="text-sm text-slate-400">MTTR Médio</p>
                  <p className="text-3xl font-extrabold text-blue-400 mt-2">1.8 h</p>
                  <p className="text-xs text-emerald-400 mt-1">↓ 12% vs mês anterior</p>
                </div>
                <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl">
                  <p className="text-sm text-slate-400">MTBF Global</p>
                  <p className="text-3xl font-extrabold text-emerald-400 mt-2">320 h</p>
                  <p className="text-xs text-emerald-400 mt-1">↑ 8% de estabilidade</p>
                </div>
                <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl">
                  <p className="text-sm text-slate-400">Disponibilidade Operacional</p>
                  <p className="text-3xl font-extrabold text-indigo-400 mt-2">96.4%</p>
                  <p className="text-xs text-slate-400 mt-1">Meta: 95.0%</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );

      
    
