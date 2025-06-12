import React, { useState, useEffect } from 'react';
import { AlertCircle, TrendingUp, Sparkles, Search } from 'lucide-react';
import { ScholarshipCard } from '../components/ScholarshipCard';
import './Dashboard.css';

export const Dashboard = () => {
  const [savedScholarships, setSavedScholarships] = useState([]);
  const [recommendedScholarships, setRecommendedScholarships] = useState([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);
  const [stats, setStats] = useState({ saved: 0, applied: 0, matches: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load initial data
    const loadData = async () => {
      try {
        // Fetch scholarships data
        const response = await fetch('../utils/data.json');
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
        
        setStats({
          saved: saved.length,
          applied: applied.length,
          matches: data.length // Or your matching logic
        });
        
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
      
      // Update stats
      setStats(prev => ({ ...prev, saved: updatedSaved.length }));
      
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
          setStats(prev => ({ ...prev, applied: updatedApplied.length }));
        }
      } else {
        console.warn('No application link found for scholarship:', id);
      }
    } catch (error) {
      console.error('Error handling scholarship application:', error);
    }
  };

  return (
    <div className="dashboard fade-in">
      
      {/* Recommended Scholarships */}
      <div className="dashboard-section">
        <h3 className="dashboard-section-title">Recommended For You</h3>
        {loading ? (
          <div className="loading-indicator">Loading recommendations...</div>
        ) : (
          <div className="scholarships-list">
            {recommendedScholarships.map(scholarship => (
              <ScholarshipCard 
                key={scholarship.id}
                {...scholarship}
                isSaved={savedScholarships.includes(scholarship.id)}
                onSave={handleSaveScholarship}
                onApply={handleApplyScholarship}
              />
            ))}
          </div>
        )}
      </div>

      {/* Upcoming Deadlines */}
      <div className="dashboard-section">
        <h3 className="dashboard-section-title">Upcoming Deadlines</h3>
        {loading ? (
          <div className="loading-indicator">Loading deadlines...</div>
        ) : (
          <div className="scholarships-list">
            {upcomingDeadlines.map(scholarship => (
              <ScholarshipCard 
                key={scholarship.id}
                {...scholarship}
                isSaved={savedScholarships.includes(scholarship.id)}
                onSave={(id) => handleSaveScholarship(id, savedScholarships.includes(id))}
                onApply={handleApplyScholarship}
              />
            ))}
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