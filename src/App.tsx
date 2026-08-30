
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BuilderProvider, useBuilder, type SupportedCountry } from './context/BuilderContext';
import { Home } from './pages/Home';
import { Builder } from './pages/Builder';
import { Cpu, Globe } from 'lucide-react';

const NavContent = () => {
  const { country, setCountry } = useBuilder();

  return (
    <nav style={{ 
      background: 'var(--bg-secondary)', 
      borderBottom: '1px solid var(--border-color)',
      padding: '1rem 0'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)' }}>
          <div style={{ background: 'var(--gradient-primary)', padding: '0.5rem', borderRadius: '8px' }}>
            <Cpu size={24} color="white" />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>
            PCBanaLo
          </span>
        </Link>
        
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link to="/" style={{ fontWeight: '500' }}>Home</Link>
          <Link to="/builder" style={{ fontWeight: '500' }}>Builder</Link>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-tertiary)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)' }}>
            <Globe size={16} color="var(--text-secondary)" />
            <select 
              value={country} 
              onChange={(e) => setCountry(e.target.value as SupportedCountry)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                outline: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit'
              }}
            >
              <option value="US">USD ($)</option>
              <option value="IN">INR (₹)</option>
              <option value="UK">GBP (£)</option>
              <option value="EU">EUR (€)</option>
              <option value="AU">AUD (A$)</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <BuilderProvider>
      <Router>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          
          {/* Navigation Bar */}
          <NavContent />

          {/* Main Content */}
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/builder" element={<Builder />} />
            </Routes>
          </main>
          
          {/* Footer */}
          <footer style={{ 
            background: 'var(--bg-secondary)', 
            borderTop: '1px solid var(--border-color)',
            padding: '2rem 0',
            textAlign: 'center',
            color: 'var(--text-secondary)',
            marginTop: 'auto'
          }}>
            <p>&copy; {new Date().getFullYear()} PCBanaLo. All rights reserved.</p>
          </footer>

        </div>
      </Router>
    </BuilderProvider>
  );
}

export default App;
