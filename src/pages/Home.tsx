import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBuilder } from '../context/BuilderContext';
import { Monitor, Briefcase, Cpu } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { setPcType, clearBuild } = useBuilder();

  const handleSelectType = (type: string) => {
    clearBuild();
    setPcType(type);
    navigate('/builder');
  };

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '4rem', paddingBottom: '4rem', textAlign: 'center' }}>
      <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Build Your Dream PC</h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 4rem auto' }}>
        Select your intended use case to begin. We'll help you pick the right components with real-time compatibility checks.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* Gaming PC Card */}
        <div 
          className="glass-card" 
          style={{ padding: '3rem 2rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          onClick={() => handleSelectType('Gaming')}
        >
          <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>
            <Monitor size={48} />
          </div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Gaming PC</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>High performance for the latest AAA titles, featuring powerful GPUs and fast refresh rates.</p>
          <button className="btn-primary" style={{ width: '100%' }}>Start Gaming Build</button>
        </div>

        {/* Workstation PC Card */}
        <div 
          className="glass-card" 
          style={{ padding: '3rem 2rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          onClick={() => handleSelectType('Workstation')}
        >
          <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem', color: 'var(--accent-secondary)' }}>
            <Cpu size={48} />
          </div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Workstation</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Optimized for heavy workloads like video editing, 3D rendering, and software development.</p>
          <button className="btn-primary" style={{ width: '100%', background: 'var(--bg-tertiary)', border: '1px solid var(--accent-secondary)' }}>Start Workstation Build</button>
        </div>

        {/* Office PC Card */}
        <div 
          className="glass-card" 
          style={{ padding: '3rem 2rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          onClick={() => handleSelectType('Office')}
        >
          <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
            <Briefcase size={48} />
          </div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Office / Home</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Reliable and cost-effective builds for everyday tasks, browsing, and productivity.</p>
          <button className="btn-secondary" style={{ width: '100%' }}>Start Office Build</button>
        </div>
      </div>
    </div>
  );
};
