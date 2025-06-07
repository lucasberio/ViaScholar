import './Navigation.css';
import React from 'react';
import { 
  LayoutDashboard, 
  User, 
  BookmarkCheck, 
  ClipboardCheck, 
  MessageSquare 
} from 'lucide-react';

export const Navigation = ({ activePage, setActivePage }) => {
  const navItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'MyProfile', label: 'Profile', icon: <User size={20} /> },
    { id: 'SavedScholarships', label: 'Saved', icon: <BookmarkCheck size={20} /> },
    { id: 'AppliedScholarships', label: 'Applied', icon: <ClipboardCheck size={20} /> },
    { id: 'EssayFeedback', label: 'Feedback', icon: <MessageSquare size={20} /> },
  ];   

  return (
    <header className="navigation">
      <div className="nav-container">
        <h1 className="nav-logo">ScholarshipTracker</h1>
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.id} className="nav-item">
                <button
                  className={`nav-link ${activePage === item.id ? 'active' : ''}`}
                  onClick={() => setActivePage(item.id)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};