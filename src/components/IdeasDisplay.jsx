import React, { useState } from 'react';
import { generatePDF, savePDF, openPDF } from '../utils/pdfExport';
import { shareViaEmail, prepareEmailContent } from '../utils/emailSharing';
import analytics from '../utils/analytics';

const IdeasDisplay = ({ ideas, filters }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  
  // Group ideas by category
  const groupedIdeas = ideas.reduce((acc, idea) => {
    const category = idea.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(idea);
    return acc;
  }, {});
  
  // Get unique categories
  const categories = ['all', ...Object.keys(groupedIdeas)];
  
  // Filter ideas by active category
  const filteredIdeas = activeCategory === 'all' 
    ? ideas 
    : groupedIdeas[activeCategory] || [];
  
  // Convert budget and complexity to visual indicators
  const renderBudgetIndicator = (budgetRange) => {
    const indicators = {
      low: '💰',
      medium: '💰💰',
      high: '💰💰💰'
    };
    
    return budgetRange.map(budget => indicators[budget]).join(' ');
  };

  const renderComplexity = (complexity) => {
    const indicators = {
      low: '⚙️',
      medium: '⚙️⚙️',
      high: '⚙️⚙️⚙️'
    };
    
    return indicators[complexity] || '';
  };
  
  // Handle PDF export
  const handleExportPDF = () => {
    const doc = generatePDF(ideas, filters);
    savePDF(doc);
    
    // Track this action in analytics
    analytics.trackExport('pdf', ideas.length);
  };
  
  // Handle email sharing
  const handleEmailShare = () => {
    setEmailModalOpen(true);
  };
  
  // Handle sending email
  const handleSendEmail = () => {
    if (emailAddress) {
      shareViaEmail(ideas, filters, emailAddress);
      
      // Track this action in analytics
      analytics.trackExport('email', ideas.length);
      
      // Close modal
      setEmailModalOpen(false);
      setEmailAddress('');
    }
  };
  
  // Handle clicking on an idea (for analytics)
  const handleIdeaClick = (idea) => {
    // Track this view in analytics
    analytics.trackIdeaView(idea.id, idea.title);
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <h2>Fan Engagement Ideas</h2>
        
        <div className="export-controls">
          <button className="export-button pdf-button" onClick={handleExportPDF}>
            <i></i> Export to PDF
          </button>
          <button className="export-button email-button" onClick={handleEmailShare}>
            <i></i> Email Results
          </button>
        </div>
      </div>
      
      <div className="category-tabs">
        {categories.map(category => (
          <div 
            key={category} 
            className={`category-tab ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </div>
        ))}
      </div>
      
      <div className="ideas-grid">
        {filteredIdeas.map(idea => (
          <div 
            key={idea.id} 
            className="idea-card"
            onClick={() => handleIdeaClick(idea)}
          >
            <h4 className="idea-title">{idea.title}</h4>
            <p className="idea-description">{idea.description}</p>
            
            <div className="idea-meta">
              <div className="budget-indicator">
                {renderBudgetIndicator(idea.budgetRange)}
              </div>
              
              <div className="complexity-indicator">
                {renderComplexity(idea.implementationComplexity)}
              </div>
            </div>
            
            {idea.exampleCase && (
              <div className="example-case">
                <small><strong>Example:</strong> {idea.exampleCase}</small>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Email sharing modal */}
      {emailModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Share Ideas via Email</h3>
              <button className="close-button" onClick={() => setEmailModalOpen(false)}>×</button>
            </div>
            
            <div className="modal-body">
              <p>Enter an email address to share these {ideas.length} fan engagement ideas:</p>
              
              <div className="email-form-group">
                <input
                  type="email"
                  className="email-input"
                  placeholder="recipient@example.com"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                />
              </div>
              
              <p><small>This will open your default email client with pre-populated content.</small></p>
            </div>
            
            <div className="modal-footer">
              <button className="secondary-button" onClick={() => setEmailModalOpen(false)}>
                Cancel
              </button>
              <button 
                className="primary-button" 
                onClick={handleSendEmail}
                disabled={!emailAddress}
              >
                Send Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdeasDisplay;