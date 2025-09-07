import React, { useState, useEffect } from 'react';
import { AlertCircle, Sparkles, Search, Filter } from 'lucide-react';
import { ScholarshipCard } from '../components/ScholarshipCard';
import './Dashboard.css';

export const Dashboard = () => {
  const [savedScholarships, setSavedScholarships] = useState([]);
  const [recommendedScholarships, setRecommendedScholarships] = useState([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Load initial data
    const loadData = async () => {
      try {
        // Fetch scholarships data
        const response = await fetch('/utils/data.json');
        const data = await response.json();
        
        // Load saved scholarships from storage
        const saved = await getFromStorage('savedScholarships') || [];
        const applied = await getFromStorage('appliedScholarships') || [];
        
        setRecommendedScholarships(data);
        setSavedScholarships(saved);
        
        // Set upcoming deadlines (filter from all scholarships)
        const upcoming = data.filter(sch => {
          const deadlineDate = new Date(sch.deadline);
          const today = new Date();
          const diffDays = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
          return diffDays > 0 && diffDays <= 30; // Show deadlines within 30 days
        });
        setUpcomingDeadlines(upcoming);
        
        setLoading(false);
      } catch (err) {
        console.error('Failed to load data:', err);
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Handle when a scholarship is saved/unsaved
  const handleSaveScholarship = async (id) => {
    try {
      // Get current saved scholarships
      const saved = await getFromStorage('savedScholarships') || [];
      const isCurrentlySaved = saved.includes(id);
      const updatedSaved = isCurrentlySaved
        ? saved.filter(scholarshipId => scholarshipId !== id)
        : [...saved, id];
      
      // Update local state immediately
      setSavedScholarships(updatedSaved);
      setRecommendedScholarships(prev => 
        prev.map(sch => ({
          ...sch,
          isSaved: updatedSaved.includes(sch.id)
        }))
      );
      setUpcomingDeadlines(prev => 
        prev.map(sch => ({
          ...sch,
          isSaved: updatedSaved.includes(sch.id)
        }))
      );
      
      // Persist to storage
      await saveToStorage('savedScholarships', updatedSaved);
    } catch (error) {
      console.error('Error updating saved scholarships:', error);
    }
  };

  const handleApplyScholarship = async (id) => {
    try {
      // Find the scholarship in either recommended or upcoming lists
      const scholarship = recommendedScholarships.find(s => s.id === id) || 
                         upcomingDeadlines.find(s => s.id === id);
      
      if (scholarship && scholarship.applicationLink) {
        // Open link in new tab
        window.open(scholarship.applicationLink, '_blank', 'noopener,noreferrer');
        
        // Track that user has clicked apply
        const applied = await getFromStorage('appliedScholarships') || [];
        if (!applied.includes(id)) {
          const updatedApplied = [...applied, id];
          await saveToStorage('appliedScholarships', updatedApplied);
        }
      } else {
        console.warn('No application link found for scholarship:', id);
      }
    } catch (error) {
      console.error('Error handling scholarship application:', error);
    }
  };

  // Add filtering logic before the return statement
  const filterScholarships = (scholarships) => {
    return scholarships
      .filter(sch => 
        sch.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sch.provider?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(sch => {
        if (filter === 'all') return true;
        if (filter === 'deadline-soon') {
          const now = new Date();
          const deadlineDate = new Date(sch.deadline);
          const diffDays = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24));
          return diffDays > 0 && diffDays <= 7;
        }
        if (filter === 'high-amount') {
          return sch.amount >= 5000;
        }
        return true;
      });
  };

  const filteredRecommended = filterScholarships(recommendedScholarships);
  const filteredUpcoming = filterScholarships(upcomingDeadlines);

  return (
    <div className="dashboard fade-in">
      {/* Search Container */}
      <div className="search-container">
        <div className="search-filter-bar">
          <div className="search-section">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              className="search-input"
              placeholder="Search scholarships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-section">
            <Filter className="filter-icon" size={16} />
            <select
              className="filter-select"
              value={filter}
              onChange={e => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="deadline-soon">Due Soon</option>
              <option value="high-amount">High Value</option>
            </select>
          </div>
        </div>
      </div>

      {/* Scholarship Sections */}
      <div className="dashboard-section">
        <h3 className="dashboard-section-title">
          <Sparkles size={16} />
          Recommended For You
        </h3>
        {loading ? (
          <div className="loading-indicator">Loading recommendations...</div>
        ) : (
          <div className="scholarships-list">
            {filteredRecommended.length > 0 ? (
              filteredRecommended.map(scholarship => (
                <ScholarshipCard 
                  key={scholarship.id}
                  {...scholarship}
                  isSaved={savedScholarships.includes(scholarship.id)}
                  onSave={handleSaveScholarship}
                  onApply={handleApplyScholarship}
                />
              ))
            ) : (
              <div className="loading-indicator">No scholarships found matching your criteria.</div>
            )}
          </div>
        )}
      </div>

      <div className="dashboard-section">
        <h3 className="dashboard-section-title">
          <AlertCircle size={16} />
          Upcoming Deadlines
        </h3>
        {loading ? (
          <div className="loading-indicator">Loading deadlines...</div>
        ) : (
          <div className="scholarships-list">
            {filteredUpcoming.length > 0 ? (
              filteredUpcoming.map(scholarship => (
                <ScholarshipCard 
                  key={scholarship.id}
                  {...scholarship}
                  isSaved={savedScholarships.includes(scholarship.id)}
                  onSave={handleSaveScholarship}
                  onApply={handleApplyScholarship}
                />
              ))
            ) : (
              <div className="loading-indicator">No upcoming deadlines found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper functions (you might want to move these to a separate utils file)
async function getFromStorage(key) {
  // For Chrome extension:
  // return new Promise(resolve => {
  //   chrome.storage.local.get([key], result => resolve(result[key]));
  // });
  
  // For localStorage:
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

async function saveToStorage(key, value) {
  // For Chrome extension:
  // return new Promise(resolve => {
  //   chrome.storage.local.set({ [key]: value }, () => resolve());
  // });
  
  // For localStorage:
  localStorage.setItem(key, JSON.stringify(value));
}