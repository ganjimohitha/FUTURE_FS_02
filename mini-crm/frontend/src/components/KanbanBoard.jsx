import React from 'react';
import { updateLead, deleteLead } from '../api';
import { Trash2, Phone, Mail, Building2 } from 'lucide-react';

const COLUMNS = ['New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost'];

const KanbanBoard = ({ leads, refreshLeads }) => {
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateLead(id, { status: newStatus });
      refreshLeads();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Delete this lead?')) {
      await deleteLead(id);
      refreshLeads();
    }
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', height: '100%' }}>
      {COLUMNS.map(col => {
        const columnLeads = leads.filter(l => l.status === col);
        
        return (
          <div key={col} className="glass" style={{ minWidth: '300px', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
              <h3 style={{ margin: 0, fontWeight: 600 }}>{col}</h3>
              <span style={{ background: 'var(--bg-secondary)', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {columnLeads.length}
              </span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', flex: 1, paddingRight: '0.5rem' }}>
              {columnLeads.map(lead => (
                <div key={lead._id} className="glass hover-scale" style={{ padding: '1rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-main)' }}>{lead.name}</h4>
                    <button onClick={() => handleDelete(lead._id)} style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer', opacity: 0.6 }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  {lead.company && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                      <Building2 size={14} /> {lead.company}
                    </div>
                  )}
                  {lead.email && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                      <Mail size={14} /> {lead.email}
                    </div>
                  )}
                  {lead.phone && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      <Phone size={14} /> {lead.phone}
                    </div>
                  )}
                  
                  <div style={{ marginTop: '1rem' }}>
                    <select 
                      value={lead.status} 
                      onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                      style={{ fontSize: '0.8rem', padding: '0.4rem', background: 'var(--bg-main)' }}
                    >
                      {COLUMNS.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;
