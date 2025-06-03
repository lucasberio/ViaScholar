import React from 'react';
import { Calendar, DollarSign, BookmarkPlus, CheckCircle, Clock } from 'lucide-react';
import './ScholarshipCard.css';

export const ScholarshipCard = ({ 
  id, 
  title, 
  provider, 
  amount, 
  deadline, 
  status, 
  description, 
  requirements,
  onSave,
  onApply
}) => {
  // Format amount as currency
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);

  // Format deadline date
  const formattedDeadline = new Date(deadline).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Calculate days remaining until deadline
  const daysRemaining = () => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const days = daysRemaining();
  const isUrgent = days <= 7 && days > 0;

  return ( // where our html starts
    <div className="scholarship-card">
      <div className="scholarship-card-header">
        <h3 className="scholarship-title">{title}</h3>
        <div className="scholarship-provider">{provider}</div>
      </div>
      
      <div className="scholarship-details">
        <div className="scholarship-amount">
          <DollarSign size={18} />
          <span>{formattedAmount}</span>
        </div>
        
        <div className={`scholarship-deadline ${isUrgent ? 'urgent' : ''}`}>
          <Calendar size={18} />
          <span>{formattedDeadline}</span>
          {isUrgent && (
            <span className="badge badge-warning">
              <Clock size={14} />
              {days} days left
            </span>
          )}
        </div>
      </div>
      
      {description && (
        <div className="scholarship-description">
          {description}
        </div>
      )}
      
      {requirements && requirements.length > 0 && (
        <div className="scholarship-requirements">
          <h4>Requirements:</h4>
          <ul>
            {requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="scholarship-status">
        {status === 'saved' && (
          <span className="badge badge-blue">
            <BookmarkPlus size={14} />
            Saved
          </span>
        )}
        {status === 'applied' && (
          <span className="badge badge-success">
            <CheckCircle size={14} />
            Applied
          </span>
        )}
        {status === 'deadline-soon' && (
          <span className="badge badge-warning">
            <Clock size={14} />
            Deadline Soon
          </span>
        )}
      </div>
      
      <div className="scholarship-actions">
        {!status || status !== 'saved' ? (
          <button className="btn btn-secondary" onClick={() => onSave && onSave(id)}>
            <BookmarkPlus size={16} />
            Save
          </button>
        ) : null}
        
        {!status || status !== 'applied' ? (
          <button className="btn btn-primary" onClick={() => onApply && onApply(id)}>
            <CheckCircle size={16} />
            Apply
          </button>
        ) : null}

         {!status || status !== 'applied' ? (
          <button className="btn btn-primary" onClick={() => onApply && onApply(id)}>
            Add To Calendar
          </button>
        ) : null}
      </div>
    </div>
  );
};