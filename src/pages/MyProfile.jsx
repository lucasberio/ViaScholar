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
        <div className='my-profile'>
            <div className='profile-header'>
                <h2 className='section-heading'><User size = {20} />My Profile</h2>
                {!editing && (
                    <button className="btn btn-secondary" onClick={() => setEditing(true)}>
                        Edit Profile
                        </button>
                    )}
                {editing && (
                    <form className="profile-edit-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                    </form>
                )}
            <div className="personal-information">
                <h3 className="profile-section-title">Personal Information</h3>
                <div className="profile-info-item">
                    <User size={16} className="profile-info-icon" />
                    <div className="profile-info-content">
                    <div className="profile-info-label">Name</div>
                    <div className="profile-info-value">John Doe</div>
                </div>
                </div>
                    
                <div className="profile-info-item">
                    <School size={16} className="profile-info-icon" />
                    <div className="profile-info-content">
                    <div className="profile-info-label">Email</div>
                    <div className="profile-info-value">John.Doe@gmail.com</div>
                </div>
                </div>
        </div>
        </div>

            <div className="personal-information">
                <h3 className="profile-section-title">Academic Information</h3>
                <div className="profile-info-item">
                    <School size={16} className="profile-info-icon" />
                    <div className="profile-info-content">
                    <div className="profile-info-label">School</div>
                    <div className="profile-info-value">University of Technology</div>
                </div>
                </div>
                    
                <div className="profile-info-item">
                    <GraduationCap size={16} className="profile-info-icon" />
                    <div className="profile-info-content">
                    <div className="profile-info-label">Major</div>
                    <div className="profile-info-value">Business Administration</div>
                </div>
                </div>

                    <div className="profile-info-item">
                    <Award size={16} className="profile-info-icon" />
                    <div className="profile-info-content">
                    <div className="profile-info-label">GPA</div>
                    <div className="profile-info-value">3.8</div>
                </div>
                </div>
        </div>




            <div className="personal-information">
                <h3 className="profile-section-title">Achievements & Activities</h3>
                <div className="profile-info-item">
                    <Award size={16} className="profile-info-icon" />
                    <div className="profile-info-content">
                    <div className="profile-info-label">Awards & Honors</div>
                    <div className="profile-info-value">A Honor Roll List (2023, 2024)</div>
                </div>
                </div>
                    
                <div className="profile-info-item">
                    <GraduationCap size={16} className="profile-info-icon" />
                    <div className="profile-info-content">
                    <div className="profile-info-label">Extracurricular Activities</div>
                    <div className="profile-info-value">Debate Team</div>
                </div>
                </div>

        </div>


        </div>

        

    );
};