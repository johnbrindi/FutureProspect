import React, { useState } from 'react';
import {
  User, Briefcase, MessageSquare, Bell, Upload,
  MapPin, Globe, Plus, ThumbsUp,
  MessageCircle, Share2, Search
} from 'lucide-react';
import './studentDashboard.css';

const StudentDashboard = () => {
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const companies = [
    {
      id: 1,
      name: 'Tech Company Inc.',
      logo: '/api/placeholder/48/48',
      industry: 'Software Development',
      post: "We're excited to announce our summer internship program! Looking for passionate developers.",
      postedTime: '2h ago'
    },
    {
      id: 2,
      name: 'Digital Solutions Ltd',
      logo: '/api/placeholder/48/48',
      industry: 'IT Services',
      post: 'Join our team as a frontend development intern. React experience required.',
      postedTime: '4h ago'
    }
  ];

  return (
    <div className="dashboard">
      {isMessagingOpen && (
        <div className="messaging-window">
          <div className="messaging-header">
            <h3>Messages</h3>
            <button onClick={() => setIsMessagingOpen(false)}>✕</button>
          </div>
          <div className="messaging-body">
            <p>Hello! How can I assist you today?</p>
          </div>
        </div>
      )}
      <nav className="navbar">
        <div className="navbar-left">
          <h1>FutureProspect</h1>
        </div>
        <div className="navbar-right">
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <Search className="search-icon" />
          </div>
          <button className="icon-button">
            <Bell />
          </button>
          <button className="icon-button">
            <MessageSquare />
          </button>
          <div className="profile-icon">
            {profileImage ? (
              <img src={profileImage} alt="Profile" />
            ) : (
              <User />
            )}
          </div>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="sidebar">
          <div className="profile-section">
            <div className="profile-image">
              {profileImage ? (
                <img src={profileImage} alt="Profile" />
              ) : (
                <User />
              )}
              
              <label className="upload-button">
                <Upload />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                //   className="hidden"
                />
              </label>
            </div>
            <h2>John Brindi</h2>
            <p>Computer Engineering Student</p>
            <p><MapPin /> Bamenda, Cameroon</p>
            <button className="edit-profile-button">Edit Profile</button>
          </div>
          <div className="skills-section">
            <h3>Skills</h3>
            <div className="skills-list">
              {['React', 'Node.js', 'Python', 'UI/UX'].map((skill) => (
                <span key={skill} className="skill-tag">{skill}</span>
              ))}
              <button className="add-skill-button">
                <Plus />
              </button>
            </div>
          </div>
        </div>

        <div className="main-content">
          <div className="post-box">
            <div className="post-input">
              {profileImage ? (
                <img src={profileImage} alt="Profile" />
              ) : (
                <User />
              )}
              <input type="text" placeholder="Share your thoughts..." />
            </div>
            <div className="post-actions">
              <button>
                <Upload /> Photo
              </button>
              <button>
                <Globe /> Article
              </button>
              <button>
                <Briefcase /> Job
              </button>
            </div>
          </div>

          {companies.map((company) => (
            <div key={company.id} className="company-post">
              <div className="post-header">
                <img src={company.logo} alt={`${company.name} logo`} />
                <div>
                  <h3>{company.name}</h3>
                  <p>{company.industry}</p>
                  <p>{company.postedTime}</p>
                </div>
              </div>
              <p>{company.post}</p>
              <div className="post-actions">
                <button>
                  <ThumbsUp /> Like
                </button>
                <button>
                  <MessageCircle /> Comment
                </button>
                <button>
                  <Share2 /> Share
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="right-sidebar">
          <div className="connections-section">
            <h3>Connections</h3>
            {[1, 2, 3].map((connection) => (
              <div key={connection} className="connection">
                <div className="connection-info">
                  <div className="connection-image"></div>
                  <div>
                    <h4>Jane Smith</h4>
                    <p>Software Engineer</p>
                  </div>
                </div>
                <button>Connect</button>
              </div>
            ))}
          </div>

          <div className="recommended-companies">
            <h3>Recommended Companies</h3>
            {companies.map((company) => (
              <div key={company.id} className="company">
                <img src={company.logo} alt={`${company.name} logo`} />
                <div>
                  <h4>{company.name}</h4>
                  <p>{company.industry}</p>
                </div>
                <button>Follow</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;