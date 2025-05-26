import './Navigation.css';
import React from 'react';
import { 
  LayoutDashboard, 
  User, 
  BookmarkCheck, 
  ClipboardCheck, 
  Calendar, 
  MessageSquare 
} from 'lucide-react';


export const Navigation = ({ activePage, setActivePage}) => {
    const navItems = [
        { id: 'Dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'MyProfile', label: 'My Profile', icon: <User size={20} /> },
        { id: 'SavedScholarships', label: 'Saved Scholarships', icon: <BookmarkCheck size={20} /> },
        { id: 'EssayFeedback', label: 'Essay Feedback', icon: <BookmarkCheck size={20} /> },
    ];   

  return (
    <aside className="navigation">
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
    </aside>
  );
};




