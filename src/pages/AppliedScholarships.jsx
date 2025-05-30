// src/pages/AppliedScholarships.jsx
import React, { useState, useEffect } from 'react';
import { ClipboardCheck } from 'lucide-react';
import { ScholarshipCard } from '../components/ScholarshipCard';
import './AppliedScholarships.css';

export default function AppliedScholarships() {
  const [applied, setApplied] = useState([]);

  useEffect(() => {
    // do real API stuff here
    setApplied([
      {
        id: '1',
        title: 'Future Tech Leaders Scholarship',
        provider: 'TechFoundation Inc.',
        amount: 5000,
        deadline: '2025-06-30',
        status: 'applied',
        description: 'For students pursuing CS/Engineering.',
        requirements: ['Min. GPA: 3.5']
      },
      {
        id: '2',
        title: 'Community Leadership Award',
        provider: 'Local Community Foundation',
        amount: 2000,
        deadline: '2025-04-10',
        status: 'applied',
        description: 'Outstanding community service.',
        requirements: []
      }
    ]);
  }, []);

  return (
    <div className="applied page">
      <header className="applied-header">
        <ClipboardCheck size={24} />
        <h2>Applied Scholarships</h2>
        <span className="applied-count">{applied.length} applications</span>
      </header>

      <section className="applied-list">
        {applied.map(sch => (
          <ScholarshipCard
            key={sch.id}
            {...sch}
            // already applied
            onApply={() => {
            }}
          />
        ))}
      </section>
    </div>
  );
}
