import './MyProfile.css';
import { User, School, GraduationCap, Award, Building, Save } from 'lucide-react';

function MyProfile() {
    return (
        <div className='my-profile'>
            <h1>My Profile</h1>
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
}

export default MyProfile;