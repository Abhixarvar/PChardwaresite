import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBuilder } from '../context/BuilderContext';
import { Monitor, Cpu, Zap, Settings, Check, X } from 'lucide-react';
import { mockConfigs } from '../data/mockConfigs';
import type { PreconfiguredBuild } from '../data/mockConfigs';
import { mockComponents } from '../data/mockComponents';

type ViewState = 'initial' | 'typeSelection' | 'targetSelection' | 'configSelection';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { setPcType, clearBuild, addComponent, formatPrice } = useBuilder();
  
  const [view, setView] = useState<ViewState>('initial');
  const [selectedType, setSelectedType] = useState<'Gaming' | 'Work' | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);

  const handleSelectType = (type: 'Gaming' | 'Work') => {
    setSelectedType(type);
    setView('targetSelection');
  };

  const handleSelectTarget = (target: string) => {
    setSelectedTarget(target);
    setView('configSelection');
  };

  const handleApplyConfig = (config: PreconfiguredBuild) => {
    clearBuild();
    setPcType(config.type);
    
    // Add components from the config
    Object.values(config.componentIds).forEach((id) => {
      if (!id) return;
      const component = mockComponents.find(c => c.id === id);
      if (component) {
        addComponent(component);
      }
    });

    navigate('/builder');
  };

  // Helper to calculate total price of a config
  const getConfigPrice = (config: PreconfiguredBuild) => {
    let total = 0;
    Object.values(config.componentIds).forEach(id => {
      const comp = mockComponents.find(c => c.id === id);
      if (comp) total += comp.price;
    });
    return total;
  };

  // Get unique targets for the selected type
  const availableTargets = Array.from(new Set(mockConfigs.filter(c => c.type === selectedType).map(c => c.target)));
  
  // Get configs for selected target
  const availableConfigs = mockConfigs.filter(c => c.target === selectedTarget);

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
          <h1 className="text-gradient hero-title" style={{ fontSize: '4.5rem', marginBottom: '1rem', textShadow: '0 4px 20px rgba(0,0,0,0.5)', lineHeight: 1.1 }}>Power Your Passion</h1>
          <p className="hero-subtitle" style={{ fontSize: '1.25rem', maxWidth: '650px', margin: '0 auto', color: 'rgba(255,255,255,0.9)', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            Experience top-tier performance with our expertly crafted prebuilts, or design your ultimate custom rig from the ground up.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '5rem 2rem' }}>
        {view === 'initial' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem', maxWidth: '900px', margin: '0 auto' }}>
            <div className="glass-card" style={{ padding: '4rem 3rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }} onClick={() => setView('typeSelection')}>
              <div style={{ background: 'var(--bg-tertiary)', padding: '2rem', borderRadius: '50%', marginBottom: '2rem', color: 'var(--accent-primary)', boxShadow: 'var(--shadow-glow)' }}>
                <Zap size={64} />
              </div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Pre-Configured Builds</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>Choose your game or workflow, and we'll recommend the perfect balanced rig.</p>
              <button className="btn-primary" style={{ width: '100%', fontSize: '1.1rem', padding: '1rem 2rem' }}>Browse Configs</button>
            </div>

            <div className="glass-card" style={{ padding: '4rem 3rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }} onClick={() => { clearBuild(); navigate('/builder'); }}>
              <div style={{ background: 'var(--bg-tertiary)', padding: '2rem', borderRadius: '50%', marginBottom: '2rem', color: 'var(--accent-secondary)' }}>
                <Settings size={64} />
              </div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Custom Build</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>Hand-pick every component to match your exact needs, budget, and aesthetics.</p>
              <button className="btn-secondary" style={{ width: '100%', borderColor: 'var(--accent-secondary)', color: 'var(--accent-secondary)', fontSize: '1.1rem', padding: '1rem 2rem' }}>Start Configuring</button>
            </div>
          </div>
        )}

        {view === 'typeSelection' && (
          <div className="animate-fade-in">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <button onClick={() => setView('initial')} style={{ color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '1.5rem', fontSize: '1rem', textDecoration: 'underline' }}>
                &larr; Back to options
              </button>
              <h2 className="text-gradient hero-title" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>What's your primary use case?</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>Select what you'll be doing most to get tailored recommendations.</p>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap' }}>
              <div className="glass-card" style={{ padding: '3rem 2rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', minWidth: '300px' }} onClick={() => handleSelectType('Gaming')}>
                <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>
                  <Monitor size={48} />
                </div>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Gaming</h2>
                <p style={{ color: 'var(--text-secondary)' }}>High performance for the latest AAA titles and competitive esports.</p>
              </div>

              <div className="glass-card" style={{ padding: '3rem 2rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', minWidth: '300px' }} onClick={() => handleSelectType('Work')}>
                <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem', color: 'var(--accent-secondary)' }}>
                  <Cpu size={48} />
                </div>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Work & Productivity</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Optimized for video editing, 3D rendering, and software development.</p>
              </div>
            </div>
          </div>
        )}

        {view === 'targetSelection' && (
          <div className="animate-fade-in">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <button onClick={() => setView('typeSelection')} style={{ color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '1.5rem', fontSize: '1rem', textDecoration: 'underline' }}>
                &larr; Back to use cases
              </button>
              <h2 className="text-gradient hero-title" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
                Choose your {selectedType === 'Gaming' ? 'Game / Goal' : 'Workflow'}
              </h2>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
              {availableTargets.map(target => (
                 <div key={target} className="glass-card hover-glow" style={{ padding: '2rem', cursor: 'pointer', textAlign: 'center', transition: 'var(--transition-fast)' }} onClick={() => handleSelectTarget(target)}>
                   <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>{target}</h3>
                 </div>
              ))}
            </div>
          </div>
        )}

        {view === 'configSelection' && (
          <div className="animate-fade-in">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <button onClick={() => setView('targetSelection')} style={{ color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '1.5rem', fontSize: '1rem', textDecoration: 'underline' }}>
                &larr; Back to targets
              </button>
              <h2 className="text-gradient hero-title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Recommended Builds for {selectedTarget}</h2>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
              {availableConfigs.map(config => (
                <div key={config.id} className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{config.name}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.5 }}>{config.description}</p>
                  </div>
                  
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-primary)', marginBottom: '2rem' }}>
                    {formatPrice(getConfigPrice(config))}
                  </div>

                  <div style={{ marginBottom: '2rem', flex: 1 }}>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Pros</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0' }}>
                      {config.pros.map((pro, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                          <Check size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span style={{ fontSize: '0.95rem' }}>{pro}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Cons</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {config.cons.map((con, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                          <X size={18} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span style={{ fontSize: '0.95rem' }}>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="btn-primary" style={{ width: '100%', padding: '1rem' }} onClick={() => handleApplyConfig(config)}>
                    Select This Build
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

