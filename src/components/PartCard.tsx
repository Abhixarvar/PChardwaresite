import React from 'react';
import type { PCComponent } from '../data/mockComponents';
import { Plus, Check } from 'lucide-react';
import { useBuilder } from '../context/BuilderContext';

interface PartCardProps {
  component: PCComponent;
  isSelected?: boolean;
}

export const PartCard: React.FC<PartCardProps> = ({ component, isSelected }) => {
  const { addComponent, removeComponent, formatPrice } = useBuilder();

  const handleAction = () => {
    if (isSelected) {
      removeComponent(component.category);
    } else {
      addComponent(component);
    }
  };

  return (
    <div className={`glass-card animate-fade-in ${isSelected ? 'selected' : ''}`} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', border: isSelected ? '1px solid var(--accent-primary)' : '' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{component.name}</h3>
          <span className="badge badge-success">{formatPrice(component.price)}</span>
        </div>
        <button 
          className={isSelected ? "btn-secondary" : "btn-primary"} 
          onClick={handleAction}
          style={{ padding: '0.5rem', borderRadius: '50%' }}
        >
          {isSelected ? <Check size={20} /> : <Plus size={20} />}
        </button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: 'auto' }}>
        {Object.entries(component.specs).map(([key, value]) => (
          <div key={key} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', background: 'var(--bg-tertiary)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
            <strong>{key}:</strong> {value}
          </div>
        ))}
      </div>
    </div>
  );
};
