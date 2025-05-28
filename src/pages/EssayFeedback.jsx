import React, { useState } from 'react';
import { MessageSquare, Save, Star, Trash2 } from 'lucide-react';
import './EssayFeedback.css';

export default function EssayFeedback() {
  const [prompt, setPrompt] = useState('');
  const [savedPrompts, setSavedPrompts] = useState([]);
  const [essay, setEssay] = useState('');

  // saving prompt + essay together
  const savePrompt = () => {
    const trimmed = prompt.trim(); // remove whitespace
    if (!trimmed) return;
    setSavedPrompts(prev => [
      { prompt: trimmed, essay, id: Date.now() },
      ...prev
    ]);
  };

  // delete prompt 
  const deletePrompt = (id) => {
    setSavedPrompts(prev => prev.filter(p => p.id !== id));
  };

  // get ai feedback somehow
  const requestFeedback = async () => {
    console.log('Ask AI for feedback on:', { prompt, essay });
    const res = await fetch('http://localhost:5000/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ essay }),
    });

  const data = await res.json();
  console.log('AI feedback response:', data.feedback);
  return data.feedback;

  };

  // get word count
  const wordCount = essay.trim() ? essay.trim().split(/\s+/).length : 0;

  return (
    <div className="essay-feedback page">
      <header className="essay-header">
        <MessageSquare size={24} />
        <h2>Essay Feedback</h2>
      </header>

      <section className="prompt-card">
        <h3>Scholarship Essay Prompt</h3>
        <div className="prompt-control">
          <input
            type="text"
            placeholder="Enter the scholarship essay prompt or question..."
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
          />
          <button className="save" onClick={savePrompt}>
            <Save size={16} /> Save
          </button>
        </div>
      </section>

      <section className="essay-card">
        <h3>Your Essay</h3>
        <textarea
          placeholder="Write or paste your essay here..."
          value={essay}
          onChange={e => setEssay(e.target.value)}
        />
        <div className="essay-footer">
          <span className="word-count">{wordCount} words</span>
          <button className="request-feedback" onClick={requestFeedback}>
            <Star size={16} /> Get AI Feedback
          </button>
        </div>
      </section>

      <section className="saved-prompts">
        <h3>Saved Prompts</h3>
        {savedPrompts.length === 0 ? (
          <p className="empty-message">No saved prompts yet.</p>    // no prompts yet
        ) : (
          <ul> {/*unordered list*/}
            {savedPrompts.map(p => (    // map the saved prompts
              <li key={p.id} className="saved-item">
                <div className="prompt-text">
                  <p>Prompt:</p> {p.prompt}<br/>
                  <p>Essay Excerpt:</p>{' '}
                  {/* limit length of preview essay */}
                  {p.essay ? `${p.essay.slice(0, 80)}…` : <p>(no essay)</p>} 
                </div>
                <button
                  className="delete"   
                  onClick={() => deletePrompt(p.id)}
                  title="Delete this prompt"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
