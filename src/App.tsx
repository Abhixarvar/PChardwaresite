
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BuilderProvider } from './context/BuilderContext';
import { Home } from './pages/Home';
import { Builder } from './pages/Builder';
import { Cpu } from 'lucide-react';

function App() {
  return (
    <BuilderProvider>
      <Router>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          
          {/* Navigation Bar */}
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
              
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <Link to="/" style={{ fontWeight: '500' }}>Home</Link>
                <Link to="/builder" style={{ fontWeight: '500' }}>Builder</Link>
              </div>
            </div>
          </nav>

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
