import React, { useState} from 'react';
import "./studentReg.css"
import { FaTimes } from 'react-icons/fa'
import { resgiterUser } from '../services/api.js';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';


const StudentRegistration =({show, handleClose, children}) => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    department: '',
    yearOfStudy: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try{
      const response = await resgiterUser(formData);
      console.log('Registration Response:', response); // Log the response
      alert('Registration successful:' + response.User.firstname)

      // Rediract to dashboard
        // Redirect to dashboard with user's first name
      navigate('/StudentDashboard', { state: { userName: response.User.firstname } });
    }
    catch(error){
      console.error(error)
      alert('Registration failed' + error.response?.data?.message || 'An error occured');
    }
    console.log('Form submitted:', formData)

    // Clear any existing errors
    setError('');
    
    // Log form submission (replace with your API call)
    console.log('Form submitted:', formData);
  };
  



  return (
    <div className={`container1 ${show ? 'show': ''}`}>

     <div className='registration-container'>
     <button className="close-toggle" onClick={handleClose}>
        <FaTimes />
      </button>
      <h2>Student Registration</h2>
      {error && <div>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Phone Number:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Department:
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Year of Study:
            <select
              name="yearOfStudy"
              value={formData.yearOfStudy}
              onChange={handleChange}
              required
            >
              <option value="">Select Year</option>
              <option value="1">First Year</option>
              <option value="2">Second Year</option>
              <option value="3">Third Year</option>
              <option value="4">Fourth Year</option>
              <option value="5">Fifth Year</option>
            </select>
          </label>
        </div>

        <button type="submit">Register</button>

        <div>
          Already have an account? <Link to="/StudentLogin">Login here</Link>
        </div>
      </form>
    </div>
    </div>
  );
};

export default StudentRegistration;