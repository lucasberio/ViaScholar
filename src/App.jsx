import React, { useState } from 'react'
import './App.css' 
import { Dashboard } from './pages/Dashboard';

function App() {
  const [activePage, setActivePage] = useState('Dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard':
        console.log('Rendering Dashboard');
        return <Dashboard />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <main className="main-content">
      {renderPage()}
    </main>
  );
}

export default App;