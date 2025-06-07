import React, { useState, useEffect } from 'react';
import { ScholarshipCard } from '../components/ScholarshipCard';
import { BookmarkCheck, Search, Filter } from 'lucide-react';
import './SavedScholarships.css';

export default function SavedScholarships() {
  const [allScholarships, setAllScholarships] = useState([]); // All available scholarships
  const [savedScholarshipIds, setSavedScholarshipIds] = useState([]); // Just the saved IDs
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Load all scholarships and saved IDs
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load all scholarships
        const response = await fetch('../utils/data.json');
        const data = await response.json();
        setAllScholarships(data);

        // Load saved IDs
        const saved = JSON.parse(localStorage.getItem('savedScholarships') || '[]');
        setSavedScholarshipIds(saved);
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };

    loadData();

    const handleStorageChange = (e) => {
      if (e.key === 'savedScholarships') {
        const saved = JSON.parse(e.newValue || '[]');
        setSavedScholarshipIds(saved);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Get the actual saved scholarships by filtering allScholarships
  const savedScholarships = allScholarships.filter(sch => 
    savedScholarshipIds.includes(sch.id)
  );

  // Filtering logic
  const filtered = savedScholarships
    .filter(sch => 
      sch.name && sch.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(sch => {
      if (filter === 'all') return true;
      if (filter === 'deadline-soon') {
        const now = new Date();
        const deadlineDate = new Date(sch.dueDate);
        const diffDays = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24));
        return diffDays > 0 && diffDays <= 7;
      }
      if (filter === 'high-amount') {
        const maxAmount = Math.max(...(sch.amounts?.map(a => a.value) || [0]));
        return maxAmount >= 5000;
      }
      return true;
    });

  // Handle unsaving a scholarship
  const handleUnsaveScholarship = (scholarshipId) => {
    try {
      const updatedIds = savedScholarshipIds.filter(id => id !== scholarshipId);
      setSavedScholarshipIds(updatedIds);
      localStorage.setItem('savedScholarships', JSON.stringify(updatedIds));
    } catch (error) {
      console.error('Error unsaving scholarship:', error);
    }
  };

  if (loading) {
    return <div className="saved-scholarships page">Loading...</div>;
  }

  return (
    <div className="saved-scholarships page">
      <header className="saved-header">
        <BookmarkCheck size={20} />
        <h2>Saved Scholarships</h2>
        <span className="saved-count">
          {filtered.length} saved
        </span>
      </header>

      <div className="saved-controls">
        <div className="search-bar">
          <Search size={16} className="icon" />
          <input
            type="text"
            placeholder="Search saved scholarships…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-dropdown">
          <Filter size={16} className="icon" />
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value="all">All Scholarships</option>
            <option value="deadline-soon">Deadline Soon</option>
            <option value="high-amount">High Amount</option>
          </select>
        </div>
      </div>

      <section className="scholarships-list">
        {filtered.length > 0 ? (
          filtered.map(sch => (
            <ScholarshipCard
              key={sch.id}
              {...sch}
              isSaved={true}
              onSave={() => handleUnsaveScholarship(sch.id)}
            />
          ))
        ) : (
          <div className="empty-state">
            No saved scholarships found. Save some scholarships to see them here!
          </div>
        )}
      </section>
    </div>
  );
}