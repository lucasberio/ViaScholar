import React from 'react';
import { 
  LayoutDashboard, 
  User, 
  BookmarkCheck, 
  ClipboardCheck, 
  MessageSquare, 
  Wrench,
  HelpCircle
} from 'lucide-react';

import owlLogo from '../assets/aleHeadFinal.png';
import './Navigation.css';

export const Navigation = ({ activePage, setActivePage, onOpenAddScholarship }) => {
  const navItems = [
    { id: 'Dashboard',           label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'SavedScholarships',   label: 'Saved',     icon: <BookmarkCheck   size={20} /> },
    { id: 'AppliedScholarships', label: 'Applied',   icon: <ClipboardCheck  size={20} /> },
    { id: 'EssayFeedback',       label: 'Feedback',  icon: <MessageSquare   size={20} /> },
    { id: 'MyProfile',           label: 'Profile',   icon: <User            size={20} /> },
    { id: 'CustomScholarships',  label: 'Custom',    icon: <Wrench          size={20} /> },
  ];

  return (
  <header className="navigation">
    <div className="nav-container">
      {/* Brand/logo row */}
      <div className="nav-brand">
        <img
          src={owlLogo}
          alt="ScholiTracker Logo"
          className="nav-logo-icon"
        />
        <h1 className="nav-logo">ViaScholar</h1>
      </div>

      {/* Navigation links */}
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {navItems.map(item => (
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

      {/* Right-side actions */}
      <div className="nav-actions">
        <button
          className="add-scholarship-nav-btn"
          onClick={onOpenAddScholarship}
        >
          + Add Scholarship
        </button>
      </div>
    </div>
  </header>
);


};
