import React, { useState } from 'react';
import { mockComponents, type ComponentCategory } from '../data/mockComponents';
import { PartCard } from './PartCard';
import { useBuilder } from '../context/BuilderContext';
import { Search } from 'lucide-react';

interface ComponentSelectorProps {
  category: ComponentCategory;
}

export const ComponentSelector: React.FC<ComponentSelectorProps> = ({ category }) => {
  const { selectedComponents } = useBuilder();
  const [searchTerm, setSearchTerm] = useState('');

  const components = mockComponents.filter(c => c.category === category && c.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const selectedComponent = selectedComponents[category];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-tertiary)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
        <Search size={20} color="var(--text-secondary)" style={{ marginRight: '0.75rem' }} />
        <input 
          type="text" 
          placeholder={`Search ${category}...`} 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ 
            background: 'transparent', 
            border: 'none', 
            color: 'var(--text-primary)', 
            outline: 'none', 
            width: '100%',
            fontFamily: 'inherit'
          }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {components.map(component => (
          <PartCard 
            key={component.id} 
            component={component} 
            isSelected={selectedComponent?.id === component.id} 
          />
        ))}
        {components.length === 0 && (
          <div style={{ color: 'var(--text-secondary)', textAlign: 'center', gridColumn: '1 / -1', padding: '2rem' }}>
            No components found for "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};
