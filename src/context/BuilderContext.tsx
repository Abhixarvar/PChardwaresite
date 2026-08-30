import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { PCComponent, ComponentCategory } from '../data/mockComponents';

export type SupportedCountry = 'US' | 'IN' | 'UK' | 'EU' | 'AU';

interface BuilderContextType {
  selectedComponents: Record<ComponentCategory, PCComponent | null>;
  pcType: string;
  setPcType: (type: string) => void;
  addComponent: (component: PCComponent) => void;
  removeComponent: (category: ComponentCategory) => void;
  totalPrice: number;
  compatibilityScore: number;
  compatibilityWarnings: string[];
  clearBuild: () => void;
  country: SupportedCountry;
  setCountry: (country: SupportedCountry) => void;
  formatPrice: (usdPrice: number) => string;
}

const EXCHANGE_RATES: Record<SupportedCountry, { rate: number; symbol: string; locale: string }> = {
  US: { rate: 1, symbol: '$', locale: 'en-US' },
  IN: { rate: 83.5, symbol: '₹', locale: 'en-IN' },
  UK: { rate: 0.79, symbol: '£', locale: 'en-GB' },
  EU: { rate: 0.93, symbol: '€', locale: 'de-DE' },
  AU: { rate: 1.52, symbol: 'A$', locale: 'en-AU' },
};

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const BuilderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pcType, setPcType] = useState<string>('');
  const [country, setCountry] = useState<SupportedCountry>('US');
  const [selectedComponents, setSelectedComponents] = useState<Record<ComponentCategory, PCComponent | null>>({
    CPU: null,
    Motherboard: null,
    GPU: null,
    RAM: null,
    Storage: null,
    PowerSupply: null,
    Case: null,
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [compatibilityScore, setCompatibilityScore] = useState(100);
  const [compatibilityWarnings, setCompatibilityWarnings] = useState<string[]>([]);

  const addComponent = (component: PCComponent) => {
    setSelectedComponents((prev) => ({
      ...prev,
      [component.category]: component,
    }));
  };

  const removeComponent = (category: ComponentCategory) => {
    setSelectedComponents((prev) => ({
      ...prev,
      [category]: null,
    }));
  };

  const clearBuild = () => {
    setSelectedComponents({
      CPU: null,
      Motherboard: null,
      GPU: null,
      RAM: null,
      Storage: null,
      PowerSupply: null,
      Case: null,
    });
    setPcType('');
  };

  // Calculate Price and Compatibility whenever components change
  useEffect(() => {
    let price = 0;
    let warnings: string[] = [];
    let score = 100;

    const components = Object.values(selectedComponents).filter((c): c is PCComponent => c !== null);
    
    components.forEach(c => { price += c.price; });
    
    // Simple compatibility checks
    const cpu = selectedComponents.CPU;
    const mb = selectedComponents.Motherboard;
    const ram = selectedComponents.RAM;
    const psu = selectedComponents.PowerSupply;
    const gpu = selectedComponents.GPU;

    if (cpu && mb) {
      const cpuSocket = cpu.specs.Socket;
      const mbSocket = mb.specs.Socket;
      if (cpuSocket !== mbSocket) {
        warnings.push(`CPU Socket (${cpuSocket}) does not match Motherboard Socket (${mbSocket}).`);
        score -= 50;
      }
    }

    if (mb && ram) {
      const mbMemory = mb.specs.Memory;
      const ramType = ram.specs.Type;
      if (mbMemory !== ramType) {
        warnings.push(`RAM Type (${ramType}) is not supported by Motherboard (${mbMemory}).`);
        score -= 30;
      }
    }

    if (gpu && psu) {
      const psuWattage = parseInt(psu.specs.Wattage.replace('W', ''), 10);
      const gpuWattageStr = gpu.specs.Power;
      if (gpuWattageStr) {
        const gpuWattage = parseInt(gpuWattageStr.replace('W', ''), 10);
        // Simple heuristic: Total system needs about GPU + 200W safety margin
        if (psuWattage < gpuWattage + 200) {
           warnings.push(`Power Supply (${psuWattage}W) might not be sufficient for GPU (${gpuWattage}W) + System.`);
           score -= 20;
        }
      }
    }

    setTotalPrice(price);
    setCompatibilityWarnings(warnings);
    setCompatibilityScore(Math.max(0, score));

  }, [selectedComponents]);

  const formatPrice = (usdPrice: number) => {
    const { rate, locale, symbol } = EXCHANGE_RATES[country];
    const converted = usdPrice * rate;
    
    // Format using Intl.NumberFormat for proper comma separation
    const formattedAmount = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(converted);

    // Depending on the country, the symbol position might change, but for simplicity
    // we manually construct it or rely on the basic symbol we defined.
    return `${symbol}${formattedAmount}`;
  };

  return (
    <BuilderContext.Provider value={{
      selectedComponents,
      pcType,
      setPcType,
      addComponent,
      removeComponent,
      totalPrice,
      compatibilityScore,
      compatibilityWarnings,
      clearBuild,
      country,
      setCountry,
      formatPrice
    }}>
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
};
