import React from 'react';

const IdeasDisplay = ({ ideas }) => {
  // Group ideas by category
  const groupedIdeas = ideas.reduce((acc, idea) => {
    const category = idea.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(idea);
    return acc;
  }, {});

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

  return (
    <div className="ideas-results">
      <h2>Fan Engagement Ideas</h2>
      
      {Object.entries(groupedIdeas).map(([category, categoryIdeas]) => (
        <div key={category} className="category-section">
          <h3 className="category-title">
            {category.charAt(0).toUpperCase() + category.slice(1)} Experiences
          </h3>
          
          <div className="ideas-grid">
            {categoryIdeas.map(idea => (
              <div key={idea.id} className="idea-card">
                <h4>{idea.title}</h4>
                <p>{idea.description}</p>
                
                <div className="idea-meta">
                  <div className="budget">
                    <span className="meta-label">Budget:</span> 
                    <span className="meta-value">{renderBudgetIndicator(idea.budgetRange)}</span>
                  </div>
                  
                  <div className="complexity">
                    <span className="meta-label">Complexity:</span> 
                    <span className="meta-value">{renderComplexity(idea.implementationComplexity)}</span>
                  </div>
                </div>
                
                {idea.exampleCase && (
                  <div className="example-case">
                    <span className="meta-label">Example:</span> 
                    <span className="meta-value">{idea.exampleCase}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <div className="export-options">
        <button className="export-pdf">Export to PDF</button>
        <button className="export-email">Email Results</button>
      </div>
    </div>
  );
};

export default IdeasDisplay;