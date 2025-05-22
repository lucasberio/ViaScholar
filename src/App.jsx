import React, { useState } from 'react'
import './App.css' 
import { Dashboard } from './pages/Dashboard'
import Navigation from './components/Navigation'
import { Sidebar } from 'lucide-react';

function App() {
  const [activePage, setActivePage] = useState('Dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard':
        console.log('Rendering Dashboard');
        return (
            <>
            <Dashboard />
            </>
        );
      default:
                console.log(' oopss');

        return <div>Page not found</div>;
    }
  };

  return (
          <div className="app-content">
      <Navigation activePage={activePage} setActivePage={setActivePage} />
      <main className="main-content">
      {renderPage()}
    </main>
    </div>
  );
}

export default App;