import React, { useState } from 'react'
import './App.css'
import {Dashboard} from './pages/Dashboard'
import { Navigation } from './components/Navigation'
import { HelpCircle, X } from 'lucide-react';
import { MyProfile } from './pages/MyProfile'
import SavedScholarships from './pages/SavedScholarships'
import AppliedScholarships from './pages/AppliedScholarships'
import EssayFeedback from './pages/EssayFeedback'
import CustomScholarships from './pages/CustomScholarships'
import About from "./pages/About";

// scooter importing

function App() {
  const [activePage, setActivePage] = useState('Dashboard');
  const [showAbout, setShowAbout] = useState(false);
  const [showAddScholarship, setShowAddScholarship] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard':
        console.log('Rendering Dashboard');
        return <Dashboard />;
      case 'MyProfile':
        console.log('Rendering MyProfile');
        return <MyProfile />;
      case 'SavedScholarships':
        console.log('Rendering SavedScholarships');
        return <SavedScholarships />;
      case 'AppliedScholarships':
        console.log('Rendering AppliedScholarships');
        return <AppliedScholarships />;
      case 'EssayFeedback':
        console.log('Rendering EssayFeedback');
        return <EssayFeedback />;
        /*
      case 'CustomScholarships':
        console.log('Rendering CustomScholarships');
        return <CustomScholarships />;
        
      case 'About':                   
        return <About />;
        */
      default:
        console.log(' oopss');

        return <div>Page not found</div>;
    }
  };

  return (
  <div className="app-content">
    <div className="header-with-add">
      <Navigation
        activePage={activePage}
        setActivePage={setActivePage}
        onOpenAddScholarship={() => setShowAddScholarship(true)}
      />
    </div>

    <main className="main-content">
      {renderPage()}
    </main>

    {/* Add Scholarship modal */}
    {showAddScholarship && (
      <div className="modal-overlay" role="dialog" aria-modal="true" onClick={() => setShowAddScholarship(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={() => setShowAddScholarship(false)} aria-label="Close Add Scholarship" title="Close">
            <X size={20} />
          </button>
          <CustomScholarships />
        </div>
      </div>
    )}

    {/* Floating help (question mark) button */}
    <button
      className="help-btn"
      onClick={() => setShowAbout(true)}
      aria-label="About ViaScholar"
      title="About ViaScholar"
    >
      <HelpCircle size={22} />
    </button>
  </div>
);

}

export default App;