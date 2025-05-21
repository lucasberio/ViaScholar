import React, { useState, useEffect } from 'react';
import { AlertCircle, TrendingUp, Sparkles, Search } from 'lucide-react';
import { ScholarshipCard } from '../components/ScholarshipCard';
import './Dashboard.css';


export const Dashboard = () => {
  // Mock data - would be fetched from Airtable in a real implementation
  const [recommendedScholarships, setRecommendedScholarships] = useState([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);
  const [stats, setStats] = useState({
    saved: 0,
    applied: 0,
    matches: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRecommendedScholarships([
        {
          id: '1',
          title: 'Future Tech Leaders Scholarship',
          provider: 'TechFoundation Inc.',
          amount: 5000,
          deadline: '2025-06-30',
          description: 'For students pursuing degrees in Computer Science, Engineering, or related fields.',
          requirements: ['Min. GPA: 3.5', 'Major in CS/Engineering', 'U.S. Citizen']
        },
        {
          id: '2',
          title: 'Women in STEM Grant',
          provider: 'Women\'s Education Fund',
          amount: 7500,
          deadline: '2025-05-15',
          description: 'Supporting women pursuing careers in Science, Technology, Engineering, and Mathematics.',
          requirements: ['Female student', 'STEM Major', 'Min. GPA: 3.0']
        }
      ]);
      
      setUpcomingDeadlines([
        {
          id: '3',
          title: 'Community Leadership Award',
          provider: 'Local Community Foundation',
          amount: 2000,
          deadline: '2025-04-10',
          status: 'deadline-soon',
          description: 'For students with outstanding community service records.'
        }
      ]);
      
      setStats({
        saved: 12,
        applied: 5,
        matches: 24
      });
      
      setLoading(false);
    }, 1000);
  }, []);

  const handleSaveScholarship = (id) => {
    console.log(`Saving scholarship with id: ${id}`);
    // Would make API call to Airtable in real implementation
  };

  const handleApplyScholarship = (id) => {
    console.log(`Applying to scholarship with id: ${id}`);
    // Would make API call to Airtable in real implementation
  };

  return (
    <div className="dashboard fade-in">
      <h2 className="section-heading">
        <Sparkles size={20} />
        Dashboard
      </h2>

      {/* Stats Cards */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon saved">
            <AlertCircle size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-label">Saved</div>
            <div className="stat-value">{stats.saved}</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon applied">
            <TrendingUp size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-label">Applied</div>
            <div className="stat-value">{stats.applied}</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon matches">
            <Sparkles size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-label">Matches</div>
            <div className="stat-value">{stats.matches}</div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search scholarships..." 
            className="search-input" 
          />
        </div>
      </div>

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
                onSave={handleSaveScholarship}
                onApply={handleApplyScholarship}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};