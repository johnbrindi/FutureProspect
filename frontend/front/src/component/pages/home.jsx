import React, { useState } from 'react';
import { FaUserGraduate, FaBuilding, FaSearch, FaRobot, FaUserEdit, 
         FaPhone, FaEnvelope, FaComment, FaTimes, FaPaperPlane } from 'react-icons/fa';
import './Home.css';
import StudentRegistration from './studentReg.js';
import Logo  from "../assets/styles/images/futureProspect.png"
import CompanyRegistration from './companyReg.js';



const Homepage = () => {
  // State declarations
  const [showStudentModal, setShowStudentModal] = useState(false)
  const [showCompanyModal, setShowCompanyModal] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false);
  // const [openModal, setOpenModal] = useState(false)
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! How can I help you today?' }
  ]);
  const [userMessage, setUserMessage] = useState('');
  const [isContactInfoVisible, setIsContactInfoVisible] = useState(false);
  const [isSupportVisible, setIsSupportVisible] = useState(false);

  // Function to toggle chat window
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };


  // Function to toggle contact info
  const toggleContactInfo = () => {
    setIsContactInfoVisible(!isContactInfoVisible);
  };

  // Function to toggle support
  const toggleSupport = () => {
    setIsSupportVisible(!isSupportVisible);
  };

  // Function to handle message sending
  const sendMessage = () => {
    if (userMessage.trim() === '') return;

    // Add user message
    setMessages([...messages, { type: 'user', text: userMessage }]);
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: 'Thanks for your message! Our team will get back to you soon.' 
      }]);
    }, 1000);

    setUserMessage('');
  };

  // Function to handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // // Function to handle registration redirects
  // const redirectToRegistration = (userType) => {
  //   // Add your navigation logic here
  //   console.log(`Redirecting to ${userType} registration`);
  //   // For example: navigate(`/register/${userType}`);
  // };

// opening student modal
  const handleShowStudentModal = () =>{
    setShowStudentModal(true)
  }
  const handleCloseStudentModal = () =>{
    setShowStudentModal(false)
  }
// Opening company modal
  const handleShowCompanyModal = () =>{
    setShowCompanyModal(true)
  }
  const handleCloseCompanyModal = () =>{
    setShowCompanyModal(false)
  }

  return (
    <div className="homepage">
      {/* Navigation Bar */}
      <header className="navbar">
        <div className="container navbar-content">
          <div className="logo-container">
            <img src={Logo} alt="FutureProspect" className="logo" />
          </div>
          <nav className="nav-buttons">
            <button className="nav-button" onClick={toggleContactInfo}>
              <FaPhone /> Contact
            </button>
            <button className="nav-button" onClick={toggleSupport}>
              <FaEnvelope /> Support
            </button>
          </nav>
        </div>
      </header>
      {/* Hero Section */}
      <main className="main-content">
        <section className="hero">
          <div className="container">
            <h1>Find Your Perfect Internship Match</h1>
            <p>Connect with great companies in Bamenda</p>
          </div>
        </section>

        
        {/* User Type Selection */}
        <section className="user-types container">
          <div className="user-card">
            <FaUserGraduate size={48} />
            <h2>I'm a Student</h2>
            <p>Find internship opportunities and start your career journey</p>
            <button className="register-button" onClick={handleShowStudentModal}>Register as Student</button>
          </div>
          <StudentRegistration show={showStudentModal} handleClose={handleCloseStudentModal}/>

          <div className="user-card" >
            <FaBuilding size={48} />
            <h2>I'm a Company</h2>
            <p>Post internship opportunities and find talented students</p>
            <button className="register-button"  onClick={handleShowCompanyModal}>Register as Company</button>
          </div>
          <CompanyRegistration show={showCompanyModal} handleClose={handleCloseCompanyModal}/>
        </section>

        {/* Features Section */}
        <section className="features">
          <div className="container">
            <h2>Key Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <FaSearch size={32} />
                <h3>Smart Search</h3>
                <p>Find opportunities based on location, industry, and skills</p>
              </div>
              <div className="feature-card">
                <FaRobot size={32} />
                <h3>AI Assistant</h3>
                <p>Get instant help with our AI-powered chatbot</p>
              </div>
              <div className="feature-card">
                <FaUserEdit size={32} />
                <h3>Profile Management</h3>
                <p>Create and manage your professional profile</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Chatbot */}
      {isChatOpen && (
        <div className="chatbot">
          <div className="chatbot-header">
            <h3>Customer Support</h3>
            <button className="close-button" onClick={toggleChat}>
              <FaTimes />
            </button>
          </div>
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}-message`}>
                {message.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
            />
            <button onClick={sendMessage}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}

      {/* Chat Toggle Button */}
      <button className="chat-toggle" onClick={toggleChat}>
        <FaComment />
      </button>
    </div>
  );
};

export default Homepage;