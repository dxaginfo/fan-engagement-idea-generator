import React, { useState } from 'react';

const InputForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    industry: '',
    audience: [],
    budget: '',
    goals: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleMultiSelect = (e) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    
    setFormData({
      ...formData,
      [name]: selectedValues
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="engagement-form">
      <div className="form-group">
        <label htmlFor="industry">Industry/Product Type:</label>
        <select 
          id="industry" 
          name="industry" 
          value={formData.industry} 
          onChange={handleChange}
          required
        >
          <option value="">Select your industry</option>
          <option value="sports">Sports Team/League</option>
          <option value="entertainment">Entertainment Brand</option>
          <option value="consumer">Consumer Product</option>
          <option value="media">Media Company</option>
          <option value="nonprofit">Nonprofit Organization</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="audience">Target Audience (select multiple):</label>
        <select 
          id="audience" 
          name="audience" 
          multiple
          onChange={handleMultiSelect}
          required
        >
          <option value="hardcore fans">Hardcore Fans/Enthusiasts</option>
          <option value="casual fans">Casual Fans/Customers</option>
          <option value="youth">Youth/Students</option>
          <option value="families">Families</option>
          <option value="professionals">Young Professionals</option>
          <option value="seniors">Seniors</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="budget">Available Budget:</label>
        <select 
          id="budget" 
          name="budget" 
          value={formData.budget} 
          onChange={handleChange}
          required
        >
          <option value="">Select budget range</option>
          <option value="low">Low (Under $5,000)</option>
          <option value="medium">Medium ($5,000 - $25,000)</option>
          <option value="high">High ($25,000+)</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="goals">Engagement Goals (select multiple):</label>
        <select 
          id="goals" 
          name="goals" 
          multiple
          onChange={handleMultiSelect}
          required
        >
          <option value="brand awareness">Brand Awareness</option>
          <option value="community building">Community Building</option>
          <option value="direct revenue">Direct Revenue Generation</option>
          <option value="data collection">Data Collection</option>
          <option value="social media growth">Social Media Growth</option>
          <option value="brand loyalty">Loyalty/Retention</option>
        </select>
      </div>
      
      <button type="submit" className="submit-button">Generate Ideas</button>
    </form>
  );
};

export default InputForm;