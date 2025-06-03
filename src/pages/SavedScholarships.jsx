
import React, { useState, useEffect } from 'react';
import { ScholarshipCard } from '../components/ScholarshipCard';    // using ScholarshipCard component?
import { BookmarkCheck, Search, Filter } from 'lucide-react';   // for the icons
import './SavedScholarships.css';


export default function SavedScholarships() {


// state for storing the list of saved scholarships and a setter to update it
const [savedScholarships, setSavedScholarships] = useState([]);

// state for the search input's current value (initially an empty string) and setter to update it
const [searchTerm, setSearchTerm] = useState('');

// state and update for the filter, initialized to 'all'
const [filter, setFilter] = useState('all');

// useEffect hook, setup code
useEffect(() => {
  fetch('../utils/data.json')
    .then(res => res.json())
    .then(data => {
      setSavedScholarships([data]);
    })
    .catch(err => {
      console.error('Failed to load scholarships:', err);
    });
  }, []); // keep array empty, just ran initially

console.log('savedScholarships:', savedScholarships);
console.log('Type:', typeof savedScholarships);


  // filtering logic
const filtered = savedScholarships
  .filter(sch =>
    sch.name && sch.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .filter(sch => {
    if (filter === 'all') return true;
    if (filter === 'deadline-soon') {
      const now = new Date();
      const deadlineDate = new Date(sch.dueDate); // assuming valid date format
      const diffMs = deadlineDate - now;
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      return diffDays > 0 && diffDays <= 7;
    }
    if (filter === 'high-amount') {
      // assuming amounts is an array of { type, value }
      const maxAmount = Math.max(...(sch.amounts?.map(a => a.value) || [0]));
      return maxAmount >= 5000;
    }
    return true;
  });


  return (
    // top-level container for the page
    <div className="saved-scholarships page">
      <header className="saved-header">
        <BookmarkCheck size={20} />
        <h2>Saved Scholarships</h2>
        <span className="saved-count">
          {filtered.length} saved
        </span>
      </header>

      {/* div for the control bars (filer & search) */}
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
            <option value ="high-amount">High Amount</option>
          </select>
        </div>
      </div>

      <section className="scholarships-list">
        {
          // map each scholarship object to a ScholarshipCard component so they render with our given info
          // key prop used by React for list re-rendering
          // {...sch} spreads all object properties as individual props
          filtered.map(sch => (
            <ScholarshipCard
              key={sch.id}
              {...sch}
              // add handlers...
              onSave={() => { /* do nothing, already saved */}}
              onApply={() => { /* handler stuff */ }}
            />
          ))
        }
      </section>
    </div>
  );
}
