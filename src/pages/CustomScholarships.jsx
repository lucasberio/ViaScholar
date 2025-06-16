import React, { useState } from 'react';
import { Wrench } from 'lucide-react';
import { ScholarshipCard } from '../components/ScholarshipCard';
import './CustomScholarships.css';

export default function CustomScholarships() {
  // list of user-added scholarships
  const [customList, setCustomList] = useState([]);

  // form state
  const [form, setForm] = useState({
    title: '',
    provider: '',
    amount: '',
    deadline: '',
    description: '',
    requirements: '',
  });

  // handle form field changes
  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // add a new scholarship to the list
  const handleAdd = () => {
    if (!form.title.trim()) return; // require a title

    setCustomList(prev => [
      {
        id: Date.now().toString(),
        title: form.title.trim(),
        provider: form.provider.trim(),
        amount: parseFloat(form.amount) || 0,
        deadline: form.deadline,
        description: form.description.trim(),
        requirements: form.requirements
          .split(',')
          .map(r => r.trim())
          .filter(r => r),
      },
      ...prev,
    ]);

    // reset form
    setForm({
      title: '',
      provider: '',
      amount: '',
      deadline: '',
      description: '',
      requirements: '',
    });
  };

  // mark a scholarship as saved
  const handleSave = id =>
    setCustomList(prev =>
      prev.map(item => (item.id === id ? { ...item, status: 'saved' } : item))
    );

  // mark a scholarship as applied
  const handleApply = id =>
    setCustomList(prev =>
      prev.map(item => (item.id === id ? { ...item, status: 'applied' } : item))
    );

  return (
    <div className="custom page">
      <header className="custom-header">
        <Wrench size={24} />
        <h2>Custom Scholarships</h2>
      </header>

      <section className="card custom-form">
        <h3>Add a Scholarship</h3>
        <div className="field-row">
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
          />
          <input
            name="provider"
            placeholder="Provider"
            value={form.provider}
            onChange={handleChange}
          />
        </div>
        <div className="field-row">
          <input
            name="amount"
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
          />
          <input
            name="deadline"
            type="date"
            placeholder="Deadline"
            value={form.deadline}
            onChange={handleChange}
          />
        </div>
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          name="requirements"
          placeholder="Requirements (comma-separated)"
          value={form.requirements}
          onChange={handleChange}
        />
        <button className="btn btn-primary" onClick={handleAdd}>
          Add Scholarship
        </button>
      </section>

      {/* list the custom scholarships */}
      <section className="card custom-list">
        <h3>Custom Scholarships</h3>
        {customList.length === 0 ? (
          <p className="empty">You haven’t added any yet.</p>
        ) : (
          customList.map(sch => (
            <ScholarshipCard
              key={sch.id}
              {...sch}
              onSave={() => handleSave(sch.id)}
              onApply={() => handleApply(sch.id)}
            />
          ))
        )}
      </section>
    </div>
  );
}
