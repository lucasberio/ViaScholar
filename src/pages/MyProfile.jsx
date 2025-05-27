import { useState } from 'react';
import './MyProfile.css';
import { User, School, GraduationCap, Award, Building, Save } from 'lucide-react';

export const MyProfile = () => {

    const [profile, setProfile] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@gmail.com',
        school: 'University of Technology',
        major: 'Computer Science',
        minor: 'Business Administration',
        gpa: '3.8',
        gradYear: '2026',
        awards: 'Dean\'s List (2023, 2024)',
        extracurriculars: 'Robotics Club, Debate Team'
    });

    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({ ...profile});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setProfile({ ...formData});
        setEditing(false);
        // save to chrome storage here
    }


  return (
    <div className="profile-page fade-in">
      <div className="profile-header">
        <h2 className="section-heading">
          <User size={20} />
          My Profile
        </h2>
        {!editing && (
          <button className="btn btn-secondary" onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        )}
      </div>

      {editing ? (
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="profile-section">
            <h3 className="profile-section-title">Personal Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="form-input"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="form-input"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="profile-section">
            <h3 className="profile-section-title">Academic Information</h3>
            <div className="form-group">
              <label htmlFor="school" className="form-label">School/University</label>
              <input
                type="text"
                id="school"
                name="school"
                className="form-input"
                value={formData.school}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="major" className="form-label">Major</label>
                <input
                  type="text"
                  id="major"
                  name="major"
                  className="form-input"
                  value={formData.major}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="minor" className="form-label">Minor</label>
                <input
                  type="text"
                  id="minor"
                  name="minor"
                  className="form-input"
                  value={formData.minor}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="gpa" className="form-label">GPA</label>
                <input
                  type="text"
                  id="gpa"
                  name="gpa"
                  className="form-input"
                  value={formData.gpa}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="gradYear" className="form-label">Graduation Year</label>
                <input
                  type="text"
                  id="gradYear"
                  name="gradYear"
                  className="form-input"
                  value={formData.gradYear}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h3 className="profile-section-title">Achievements & Activities</h3>
            <div className="form-group">
              <label htmlFor="awards" className="form-label">Awards & Honors</label>
              <textarea
                id="awards"
                name="awards"
                className="form-input"
                value={formData.awards}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="extracurriculars" className="form-label">Extracurricular Activities</label>
              <textarea
                id="extracurriculars"
                name="extracurriculars"
                className="form-input"
                value={formData.extracurriculars}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setEditing(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-view">
          <div className="profile-section">
            <h3 className="profile-section-title">Personal Information</h3>
            <div className="profile-info-item">
              <User size={16} className="profile-info-icon" />
              <div className="profile-info-content">
                <div className="profile-info-label">Name</div>
                <div className="profile-info-value">{profile.firstName} {profile.lastName}</div>
              </div>
            </div>
            <div className="profile-info-item">
              <School size={16} className="profile-info-icon" />
              <div className="profile-info-content">
                <div className="profile-info-label">Email</div>
                <div className="profile-info-value">{profile.email}</div>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h3 className="profile-section-title">Academic Information</h3>
            <div className="profile-info-item">
              <Building size={16} className="profile-info-icon" />
              <div className="profile-info-content">
                <div className="profile-info-label">School/University</div>
                <div className="profile-info-value">{profile.school}</div>
              </div>
            </div>
            <div className="profile-info-item">
              <GraduationCap size={16} className="profile-info-icon" />
              <div className="profile-info-content">
                <div className="profile-info-label">Major / Minor</div>
                <div className="profile-info-value">{profile.major} / {profile.minor}</div>
              </div>
            </div>
            <div className="profile-info-item">
              <Award size={16} className="profile-info-icon" />
              <div className="profile-info-content">
                <div className="profile-info-label">GPA / Graduation Year</div>
                <div className="profile-info-value">{profile.gpa} / {profile.gradYear}</div>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h3 className="profile-section-title">Achievements & Activities</h3>
            <div className="profile-info-item">
              <Award size={16} className="profile-info-icon" />
              <div className="profile-info-content">
                <div className="profile-info-label">Awards & Honors</div>
                <div className="profile-info-value">{profile.awards}</div>
              </div>
            </div>
            <div className="profile-info-item">
              <GraduationCap size={16} className="profile-info-icon" />
              <div className="profile-info-content">
                <div className="profile-info-label">Extracurricular Activities</div>
                <div className="profile-info-value">{profile.extracurriculars}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};