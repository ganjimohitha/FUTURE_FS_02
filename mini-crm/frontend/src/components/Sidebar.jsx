import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Settings, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <aside className="glass-panel" style={{ width: '250px', display: 'flex', flexDirection: 'column', padding: '1.5rem', height: '100vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem', cursor: 'pointer' }}>
        <div style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', padding: '0.5rem', borderRadius: '12px' }}>
          <Users size={24} color="white" />
        </div>
        <h2 style={{ margin: 0, background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Nexus CRM
        </h2>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={20} /> Dashboard
        </NavLink>
        {/* Placeholder for future links */}
        <div className="nav-link" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
          <Settings size={20} /> Settings
        </div>
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem' }}>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: 600 }}>{user?.email || 'User'}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', textTransform: 'capitalize' }}>{user?.role || 'Guest'}</div>
          </div>
          <button onClick={logout} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }} title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </div>

      <style>{`
        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          color: var(--text-muted);
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        .nav-link:hover:not([style*="not-allowed"]) {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-main);
          transform: translateX(4px);
        }
        .nav-link.active {
          background: rgba(139, 92, 246, 0.15);
          color: var(--accent-primary);
          box-shadow: inset 3px 0 0 var(--accent-primary);
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
