import React from 'react';
import './EssayFeedback.css';
import { MessageSquare } from 'lucide-react';

export default function EssayFeedback() {
  return (
    <div className="essay-feedback page">
      <header className='essay-header'>
        <MessageSquare size={20} />
        <h2>Essay Feedback</h2>
    </header>
    </div>
  );
}
