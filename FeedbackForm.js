import React, { useState, useEffect } from 'react';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    rating: '',
    feedback: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validation rules
  const validateField = (name, value) => {
    let error = '';
    
    switch(name) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required';
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = 'Name should only contain alphabets and spaces';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'phone':
        if (value && !/^\d{10}$/.test(value)) {
          error = 'Phone number must be 10 digits';
        }
        break;
      case 'rating':
        if (!value) {
          error = 'Please select a rating';
        }
        break;
      case 'feedback':
        if (!value.trim()) {
          error = 'Feedback is required';
        } else if (value.length < 20) {
          error = 'Feedback must be at least 20 characters';
        } else if (value.length > 250) {
          error = 'Feedback cannot exceed 250 characters';
        }
        break;
      default:
        break;
    }
    
    return error;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Real-time validation on field blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Form is valid, submit data (simulate API call)
      console.log('Form submitted:', formData);
      setTimeout(() => {
        setIsSubmitted(true);
        setIsSubmitting(false);
      }, 1000);
    } else {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      rating: '',
      feedback: ''
    });
    setErrors({});
    setIsSubmitted(false);
  };

  // Character count for feedback
  const feedbackCharCount = formData.feedback.length;

  if (isSubmitted) {
    return (
      <div className="feedback-success-container">
        <h2 className="feedback-success-title">Thank You!</h2>
        <p className="feedback-success-message">Your feedback has been submitted successfully.</p>
        <button className="feedback-reset-button" onClick={handleReset}>
          Submit New Feedback
        </button>
      </div>
    );
  }

  return (
    <div className="feedback-container">
      <h2 className="feedback-title">Training Feedback Form</h2>
      <p className="feedback-subtitle">Please share your experience with the training session</p>
      
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="feedback-form-group">
          <label className="feedback-label" htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.name ? 'feedback-input error' : 'feedback-input'}
            placeholder="Enter your full name"
          />
          {errors.name && <span className="feedback-error">{errors.name}</span>}
        </div>
        
        <div className="feedback-form-group">
          <label className="feedback-label" htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email ? 'feedback-input error' : 'feedback-input'}
            placeholder="Enter your email address"
          />
          {errors.email && <span className="feedback-error">{errors.email}</span>}
        </div>
        
        <div className="feedback-form-group">
          <label className="feedback-label" htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.phone ? 'feedback-input error' : 'feedback-input'}
            placeholder="Enter your 10-digit phone number"
          />
          {errors.phone && <span className="feedback-error">{errors.phone}</span>}
        </div>
        
        <div className="feedback-form-group">
          <label className="feedback-label">Rating *</label>
          <div className="feedback-rating-container">
            {[1, 2, 3, 4, 5].map((star) => (
              <label key={star} className="feedback-radio-label">
                <input
                  type="radio"
                  name="rating"
                  value={star}
                  checked={formData.rating === star.toString()}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="feedback-radio-input"
                />
                <span className="feedback-star">{star} ★</span>
              </label>
            ))}
          </div>
          {errors.rating && <span className="feedback-error">{errors.rating}</span>}
        </div>
        
        <div className="feedback-form-group">
          <label className="feedback-label" htmlFor="feedback">Feedback *</label>
          <textarea
            id="feedback"
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            onBlur={handleBlur}
            rows="5"
            className={errors.feedback ? 'feedback-textarea error' : 'feedback-textarea'}
            placeholder="Please share your feedback (20-250 characters)"
          />
          <div className="feedback-char-count">
            {feedbackCharCount}/250 characters
            {errors.feedback && <span className="feedback-error"> - {errors.feedback}</span>}
          </div>
        </div>
        
        <div className="feedback-button-group">
          <button 
            type="submit" 
            className="feedback-submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
