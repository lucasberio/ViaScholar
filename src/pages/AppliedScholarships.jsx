import React, { useState, useEffect } from 'react';
import { ClipboardCheck } from 'lucide-react';
import { ScholarshipCard } from '../components/ScholarshipCard';
import './AppliedScholarships.css';

export default function AppliedScholarships() {
  const [appliedScholarships, setAppliedScholarships] = useState([]);
  const [allScholarships, setAllScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load all scholarships
        const response = await fetch('../utils/data.json');
        const data = await response.json();
        setAllScholarships(data);

        // Load applied scholarship IDs from storage
        const appliedIds = JSON.parse(localStorage.getItem('appliedScholarships') || []);
        
        // Get full scholarship objects for the applied IDs
        const applied = data.filter(sch => appliedIds.includes(sch.id));
        setAppliedScholarships(applied);

        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };

    loadData();

    // Listen for storage changes
    const handleStorageChange = (e) => {
      if (e.key === 'appliedScholarships') {
        const appliedIds = JSON.parse(e.newValue || '[]');
        const applied = allScholarships.filter(sch => appliedIds.includes(sch.id));
        setAppliedScholarships(applied);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [allScholarships]);

  const handleUnapply = async (id) => {
    try {
      const applied = await getFromStorage('appliedScholarships') || [];
      const updated = applied.filter(scholarshipId => scholarshipId !== id);
      
      await saveToStorage('appliedScholarships', updated);
      setAppliedScholarships(prev => prev.filter(sch => sch.id !== id));
    } catch (error) {
      console.error('Error unapplying scholarship:', error);
    }
  };

  if (loading) {
    return <div className="applied page">Loading applications...</div>;
  }

  return (
    <div className="applied page">
      <header className="applied-header">
        <ClipboardCheck size={24} />
        <h2>Applied Scholarships</h2>
        <span className="applied-count">
          {appliedScholarships.length} application{appliedScholarships.length !== 1 ? 's' : ''}
        </span>
      </header>

      <section className="applied-list">
        {appliedScholarships.length > 0 ? (
          appliedScholarships.map(sch => (
            <ScholarshipCard
              key={sch.id}
              {...sch}
              isSaved={false} // These are in applied view, not saved
              isApplied={true}
              onApply={() => handleUnapply(sch.id)}
              onSave={() => {}} // Disable save in this view
            />
          ))
        ) : (
          <div className="empty-state">
            No applications found. Apply to scholarships to see them here!
          </div>
        )}
      </section>
    </div>
  );
}

// Storage helper functions (put these in a utils file if shared)
async function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

async function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}