import React, { useState } from 'react';
import { useBuilder } from '../context/BuilderContext';
import type { ComponentCategory } from '../data/mockComponents';
import { ComponentSelector } from '../components/ComponentSelector';
import { AlertCircle, CheckCircle, ChevronLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories: ComponentCategory[] = ['CPU', 'Motherboard', 'GPU', 'RAM', 'Storage', 'PowerSupply', 'Case'];

export const Builder: React.FC = () => {
  const navigate = useNavigate();
  const { pcType, selectedComponents, totalPrice, compatibilityScore, compatibilityWarnings } = useBuilder();
  const [activeCategory, setActiveCategory] = useState<ComponentCategory>('CPU');

  if (!pcType) {
    // If accessed directly without selecting a type, maybe redirect or show a message
    return (
      <div className="container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <h2>Please select a PC type first.</h2>
        <button className="btn-primary" style={{ marginTop: '2rem' }} onClick={() => navigate('/')}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      
      {/* Header Area */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <button 
            onClick={() => navigate('/')} 
            style={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}
          >
            <ChevronLeft size={20} /> Back to Selection
          </button>
          <h1 className="text-gradient">Building: {pcType} PC</h1>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="glass-card" style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total Price</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <button className="btn-primary">
            <Save size={20} /> Save Build
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* Sidebar / Category Selection */}
        <div className="glass-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <h3 style={{ marginBottom: '1rem', paddingLeft: '0.5rem' }}>Components</h3>
          {categories.map(cat => {
            const isSelected = activeCategory === cat;
            const hasComponent = !!selectedComponents[cat];
            
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: isSelected ? 'var(--accent-glow)' : 'transparent',
                  color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                  borderLeft: isSelected ? '3px solid var(--accent-primary)' : '3px solid transparent',
                  transition: 'var(--transition-fast)'
                }}
              >
                <span>{cat}</span>
                {hasComponent && <CheckCircle size={16} color="var(--success)" />}
              </button>
            )
          })}
          
          {/* Compatibility Widget */}
          <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Compatibility</span>
              <span style={{ fontWeight: 'bold', color: compatibilityScore > 80 ? 'var(--success)' : compatibilityScore > 50 ? 'var(--warning)' : 'var(--danger)' }}>
                {compatibilityScore}%
              </span>
            </div>
            
            {/* Progress Bar */}
            <div style={{ width: '100%', height: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ 
                height: '100%', 
                width: `${compatibilityScore}%`, 
                background: compatibilityScore > 80 ? 'var(--success)' : compatibilityScore > 50 ? 'var(--warning)' : 'var(--danger)',
                transition: 'width var(--transition-normal)'
              }} />
            </div>
            
            {/* Warnings */}
            {compatibilityWarnings.length > 0 && (
              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {compatibilityWarnings.map((warning, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '0.5rem', color: 'var(--danger)', fontSize: '0.8rem', alignItems: 'flex-start' }}>
                    <AlertCircle size={14} style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>{warning}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content Area / Component Selector */}
        <div style={{ minHeight: '600px' }}>
          <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            Select {activeCategory}
            {selectedComponents[activeCategory] && (
              <span className="badge badge-success">Selected</span>
            )}
          </h2>
          <ComponentSelector category={activeCategory} />
        </div>

      </div>
    </div>
  );
};
