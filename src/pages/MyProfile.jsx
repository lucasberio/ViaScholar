import { useState, useEffect } from 'react';
import './MyProfile.css';
import { User, School, GraduationCap, Award, Building, Save } from 'lucide-react';
// Import your storage functions
import { saveToStorage, getFromStorage } from '../../utils/storage.js'; // Adjust path as needed

export const MyProfile = () => {
    // Default profile data
    const defaultProfile = {
        firstName: '',
        lastName: '',
        email: '',
        school: '',
        major: '',
        minor: '',
        gpa: '',
        gradYear: '',
        awards: '',
        extracurriculars: ''
    };

    const [profile, setProfile] = useState(defaultProfile);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({ ...profile });
    const [loading, setLoading] = useState(true);

    // Load profile data when component mounts
    useEffect(() => {
        loadProfileData();
    }, []);

    const loadProfileData = async () => {
        try {
            console.log('Loading profile data...');
            const savedProfile = await getFromStorage('userProfile');
            
            if (savedProfile) {
                console.log('Found saved profile:', savedProfile);
                setProfile(savedProfile);
                setFormData(savedProfile);
            } else {
                console.log('No saved profile found, using defaults');
                // If no saved data, you could set some defaults or leave empty
                setProfile(defaultProfile);
                setFormData(defaultProfile);
            }
        } catch (error) {
            console.error('Error loading profile data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            console.log('Saving profile data:', formData);
            
            // Save to Chrome storage
            await saveToStorage('userProfile', formData);
            
            // Update local state
            setProfile({ ...formData });
            setEditing(false);
            
            console.log('Profile saved successfully!');
            
            // Optional: Show success message
            // You could add a toast notification here
            
        } catch (error) {
            console.error('Error saving profile:', error);
            // Optional: Show error message to user
            alert('Failed to save profile. Please try again.');
        }
    };

    // Show loading state
    if (loading) {
        return (
            <div className="profile-page fade-in">
                <div className="profile-header">
                    <h2 className="section-heading">
                        <User size={20} />
                        My Profile
                    </h2>
                </div>
                <div>Loading profile...</div>
            </div>
        );
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
                    {/* Show message if profile is empty */}
                    {!profile.firstName && !profile.lastName && !profile.email ? (
                        <div className="profile-section">
                            <p>No profile information found. Click "Edit Profile" to get started!</p>
                        </div>
                    ) : (
                        <>
                            <div className="profile-section">
                                <h3 className="profile-section-title">Personal Information</h3>
                                <div className="profile-info-item">
                                    <User size={16} className="profile-info-icon" />
                                    <div className="profile-info-content">
                                        <div className="profile-info-label">Name</div>
                                        <div className="profile-info-value">
                                            {profile.firstName} {profile.lastName} 
                                            {!profile.firstName && !profile.lastName && "Not provided"}
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-info-item">
                                    <School size={16} className="profile-info-icon" />
                                    <div className="profile-info-content">
                                        <div className="profile-info-label">Email</div>
                                        <div className="profile-info-value">{profile.email || "Not provided"}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="profile-section">
                                <h3 className="profile-section-title">Academic Information</h3>
                                <div className="profile-info-item">
                                    <Building size={16} className="profile-info-icon" />
                                    <div className="profile-info-content">
                                        <div className="profile-info-label">School/University</div>
                                        <div className="profile-info-value">{profile.school || "Not provided"}</div>
                                    </div>
                                </div>
                                <div className="profile-info-item">
                                    <GraduationCap size={16} className="profile-info-icon" />
                                    <div className="profile-info-content">
                                        <div className="profile-info-label">Major / Minor</div>
                                        <div className="profile-info-value">
                                            {profile.major || "Not provided"} / {profile.minor || "Not provided"}
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-info-item">
                                    <Award size={16} className="profile-info-icon" />
                                    <div className="profile-info-content">
                                        <div className="profile-info-label">GPA / Graduation Year</div>
                                        <div className="profile-info-value">
                                            {profile.gpa || "Not provided"} / {profile.gradYear || "Not provided"}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="profile-section">
                                <h3 className="profile-section-title">Achievements & Activities</h3>
                                <div className="profile-info-item">
                                    <Award size={16} className="profile-info-icon" />
                                    <div className="profile-info-content">
                                        <div className="profile-info-label">Awards & Honors</div>
                                        <div className="profile-info-value">{profile.awards || "Not provided"}</div>
                                    </div>
                                </div>
                                <div className="profile-info-item">
                                    <GraduationCap size={16} className="profile-info-icon" />
                                    <div className="profile-info-content">
                                        <div className="profile-info-label">Extracurricular Activities</div>
                                        <div className="profile-info-value">{profile.extracurriculars || "Not provided"}</div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};