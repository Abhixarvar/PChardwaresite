import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBuilder } from '../context/BuilderContext';
import { Monitor, Briefcase, Cpu, Zap, Settings } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { setPcType, clearBuild } = useBuilder();
  const [view, setView] = useState<'initial' | 'custom'>('initial');

  const handleSelectType = (type: string) => {
    clearBuild();
    setPcType(type);
    navigate('/builder');
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          height: '60vh',
          minHeight: '400px',
          backgroundImage: 'url("/hero-pc.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'white',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(15, 17, 21, 0.65)', zIndex: 1 }}></div>
        <div style={{ position: 'relative', zIndex: 2, padding: '0 2rem' }}>
          <h1 className="text-gradient" style={{ fontSize: '4.5rem', marginBottom: '1rem', textShadow: '0 4px 20px rgba(0,0,0,0.5)', lineHeight: 1.1 }}>Power Your Passion</h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '650px', margin: '0 auto', color: 'rgba(255,255,255,0.9)', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            Experience top-tier performance with our expertly crafted prebuilts, or design your ultimate custom rig from the ground up.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '5rem 2rem' }}>
        {view === 'initial' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem', maxWidth: '900px', margin: '0 auto' }}>
            {/* Prebuilt Option */}
            <div 
              className="glass-card" 
              style={{ padding: '4rem 3rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
              onClick={() => alert('Prebuilt PCs coming soon!')}
            >
              <div style={{ background: 'var(--bg-tertiary)', padding: '2rem', borderRadius: '50%', marginBottom: '2rem', color: 'var(--accent-primary)', boxShadow: 'var(--shadow-glow)' }}>
                <Zap size={64} />
              </div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Prebuilt PCs</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>Ready to ship, expertly assembled and tested gaming and workstation systems.</p>
              <button className="btn-primary" style={{ width: '100%', fontSize: '1.1rem', padding: '1rem 2rem' }}>Shop Prebuilts</button>
            </div>

            {/* Custom Build Option */}
            <div 
              className="glass-card" 
              style={{ padding: '4rem 3rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
              onClick={() => setView('custom')}
            >
              <div style={{ background: 'var(--bg-tertiary)', padding: '2rem', borderRadius: '50%', marginBottom: '2rem', color: 'var(--accent-secondary)' }}>
                <Settings size={64} />
              </div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Custom Build</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>Hand-pick every component to match your exact needs, budget, and aesthetics.</p>
              <button className="btn-secondary" style={{ width: '100%', borderColor: 'var(--accent-secondary)', color: 'var(--accent-secondary)', fontSize: '1.1rem', padding: '1rem 2rem' }}>Start Configuring</button>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <button 
                onClick={() => setView('initial')}
                style={{ color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '1.5rem', fontSize: '1rem', textDecoration: 'underline' }}
              >
                &larr; Back to options
              </button>
              <h2 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Select Your Use Case</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>We'll help you pick the right components with real-time compatibility checks.</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
              {/* Gaming PC Card */}
              <div 
                className="glass-card" 
                style={{ padding: '3rem 2rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
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
                style={{ padding: '3rem 2rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
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
                style={{ padding: '3rem 2rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
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
        )}
      </div>
    </div>
  );
};
