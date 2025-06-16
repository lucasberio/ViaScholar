import React, { useState } from 'react'
import './App.css'
import {Dashboard} from './pages/Dashboard'
import { Navigation } from './components/Navigation'
import {Sidebar} from 'lucide-react'
import { MyProfile } from './pages/MyProfile'
import SavedScholarships from './pages/SavedScholarships'
import AppliedScholarships from './pages/AppliedScholarships'
import EssayFeedback from './pages/EssayFeedback'
import CustomScholarships from './pages/CustomScholarships'

// scooter importing

function App() {
  const [activePage, setActivePage] = useState('Dashboard');

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
      case 'CustomScholarships':
        console.log('Rendering CustomScholarships');
        return <CustomScholarships />;

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