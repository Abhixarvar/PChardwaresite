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
    <div 
      className={`glass-card animate-fade-in ${isSelected ? 'selected' : ''}`} 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        border: isSelected ? '1px solid var(--accent-primary)' : '',
        height: '100%'
      }}
    >
      {/* Image Section */}
      <div style={{ width: '100%', height: '180px', overflow: 'hidden', position: 'relative', background: 'var(--bg-tertiary)' }}>
        {component.image ? (
          <img 
            src={component.image} 
            alt={component.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} 
          />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)' }}>
            No Image Available
          </div>
        )}
        
        {/* Price Badge over image */}
        <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
          <span className="badge badge-success" style={{ background: 'rgba(16, 185, 129, 0.9)', color: '#fff', border: 'none', boxShadow: 'var(--shadow-md)' }}>
            {formatPrice(component.price)}
          </span>
        </div>
      </div>

      {/* Details Section */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', lineHeight: '1.3' }}>{component.name}</h3>
          
          <button 
            className={isSelected ? "btn-secondary" : "btn-primary"} 
            onClick={handleAction}
            style={{ padding: '0.5rem', borderRadius: '50%', flexShrink: 0 }}
          >
            {isSelected ? <Check size={20} /> : <Plus size={20} />}
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: 'auto' }}>
          {Object.entries(component.specs).map(([key, value]) => (
            <div key={key} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
              <strong>{key}:</strong> {value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
