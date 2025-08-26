import React, { useState, useEffect } from 'react';
import withAuthentication from './withAuthentication';
import withValidation from './withValidation';
import withLogging from './withLogging';

const FeedbackForm = ({ 
  errors, 
  isValid, 
  validate, 
  logAction,
  onSubmit 
}) => {
  const [formData, setFormData] = useState({
    feedbackType: '',
    comments: '',
    commentsRequired: false
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  useEffect(() => {
    // Simulate user data
    const users = ['Ravi', 'Priya', 'Amit', 'Sneha'];
    const randomUser = users[Math.floor(Math.random() * users.length)];
    localStorage.setItem('username', randomUser);
  }, []);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleBlur = () => {
    validate(formData);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate(formData)) {
      logAction('Submit Clicked');
      onSubmit(formData);
      setSubmitted(true);
      
      // Simulate API call
      setTimeout(() => {
        alert('Feedback submitted successfully!');
        setFormData({ feedbackType: '', comments: '', commentsRequired: false });
        setSubmitted(false);
      }, 1000);
    } else {
      logAction('Validation Error', errors);
    }
  };
  
  if (submitted) {
    return (
      <div className="feedback-form">
        <div className="submission-success">
          <h2>Thank You!</h2>
          <p>Your feedback has been submitted successfully.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="feedback-form">
      <div className="form-header">
        <h2>Employee Feedback Form</h2>
        <p>Please share your feedback to help us improve</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Milestone 2 Completed?</label>
          <div className="options-group">
            <label className="radio-option">
              <input
                type="radio"
                name="feedbackType"
                value="yes"
                checked={formData.feedbackType === 'yes'}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span>Yes</span>
            </label>
            
            <label className="radio-option">
              <input
                type="radio"
                name="feedbackType"
                value="no"
                checked={formData.feedbackType === 'no'}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span>No</span>
            </label>
          </div>
          {errors.feedbackType && <div className="error">{errors.feedbackType}</div>}
        </div>
        
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="commentsRequired"
              checked={formData.commentsRequired}
              onChange={handleChange}
            />
            Add comments (optional)
          </label>
        </div>
        
        {formData.commentsRequired && (
          <div className="form-group">
            <label>Comments</label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              onBlur={handleBlur}
              rows="4"
              placeholder="Please share your thoughts..."
            />
            {errors.comments && <div className="error">{errors.comments}</div>}
          </div>
        )}
        
        <button 
          type="submit" 
          className={`submit-btn ${isValid ? 'valid' : 'invalid'}`}
          disabled={!isValid}
        >
          Submit Feedback
        </button>
      </form>
      
      <div className="user-info">
        <p>Logged in as: <strong>{localStorage.getItem('username')}</strong></p>
        <button 
          onClick={() => {
            localStorage.setItem('isLoggedIn', 'false');
            window.location.reload();
          }}
          className="logout-btn"
        >
          Simulate Logout
        </button>
      </div>
    </div>
  );
};

// Compose the HOCs
const EnhancedFeedbackForm = withAuthentication(
  withValidation(
    withLogging(FeedbackForm)
  )
);

export default EnhancedFeedbackForm;
