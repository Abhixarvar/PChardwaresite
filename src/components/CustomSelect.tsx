import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import type { SupportedCountry } from '../context/BuilderContext';

interface CustomSelectProps {
  value: SupportedCountry;
  onChange: (value: SupportedCountry) => void;
}

const OPTIONS: { value: SupportedCountry; label: string }[] = [
  { value: 'US', label: 'USD ($)' },
  { value: 'IN', label: 'INR (₹)' },
  { value: 'UK', label: 'GBP (£)' },
  { value: 'EU', label: 'EUR (€)' },
  { value: 'AU', label: 'AUD (A$)' },
];

export const CustomSelect: React.FC<CustomSelectProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = OPTIONS.find(opt => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: 'relative', width: '140px' }}>
      {/* Trigger */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          background: 'var(--bg-tertiary)',
          padding: '0.5rem 0.75rem',
          borderRadius: 'var(--radius-full)',
          border: `1px solid ${isOpen ? 'var(--accent-primary)' : 'transparent'}`,
          color: 'var(--text-primary)',
          transition: 'var(--transition-fast)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Globe size={16} color="var(--text-secondary)" />
          <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{selectedOption?.label}</span>
        </div>
        <ChevronDown 
          size={16} 
          color="var(--text-secondary)" 
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 0.5rem)',
          left: 0,
          width: '100%',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          zIndex: 50,
          animation: 'fadeIn 0.2s ease forwards'
        }}>
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '0.75rem 1rem',
                background: value === opt.value ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                color: value === opt.value ? 'var(--accent-primary)' : 'var(--text-primary)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => {
                if (value !== opt.value) e.currentTarget.style.background = 'var(--bg-tertiary)';
              }}
              onMouseLeave={(e) => {
                if (value !== opt.value) e.currentTarget.style.background = 'transparent';
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
