import React, { useState, useEffect } from 'react';
import { getLeads } from '../api';
import KanbanBoard from '../components/KanbanBoard';
import { PlusCircle } from 'lucide-react';
import LeadModal from '../components/LeadModal';

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchLeads = async () => {
    try {
      const data = await getLeads();
      setLeads(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const wonLeads = leads.filter(l => l.status === 'Won').length;
  const newLeads = leads.filter(l => l.status === 'New').length;
  const totalValue = leads.length * 1000; // Placeholder stat

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', height: '100%' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ marginBottom: '0.2rem' }}>Welcome to Nexus</h1>
          <p>Here is your pipeline overview.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <PlusCircle size={18} /> New Lead
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        <div className="glass hover-scale" style={{ padding: '1.5rem' }}>
          <h3 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Total Leads</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-main)' }}>{leads.length}</p>
        </div>
        <div className="glass hover-scale" style={{ padding: '1.5rem' }}>
          <h3 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>New Opportunities</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-primary)' }}>{newLeads}</p>
        </div>
        <div className="glass hover-scale" style={{ padding: '1.5rem' }}>
          <h3 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Closed Won</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--success)' }}>{wonLeads}</p>
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0 }}>
        <KanbanBoard leads={leads} refreshLeads={fetchLeads} />
      </div>

      {isModalOpen && <LeadModal onClose={() => setIsModalOpen(false)} refreshLeads={fetchLeads} />}
    </div>
  );
};

export default Dashboard;
