import React, { useState, useEffect } from 'react';
import InputForm from './components/InputForm';
import IdeasDisplay from './components/IdeasDisplay';
import OnboardingGuide from './components/OnboardingGuide';
import { 
  filterIdeasByIndustry, 
  filterIdeasByBudget, 
  filterIdeasByAudience,
  rankIdeasByRelevance
} from './utils/ideasDatabase';
import analytics from './utils/analytics';
import './styles.css';

const App = () => {
  const [generatedIdeas, setGeneratedIdeas] = useState([]);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({});
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  // Check if it's the user's first visit and initialize analytics
  useEffect(() => {
    // Initialize analytics
    analytics.initAnalytics();
    
    // Check if this is the first visit (no record in localStorage)
    const hasVisitedBefore = localStorage.getItem('feiGenerator_visited');
    if (!hasVisitedBefore) {
      // Set as visited
      localStorage.setItem('feiGenerator_visited', 'true');
      // Show onboarding guide
      setShowOnboarding(true);
    }
    
    // Track page view
    analytics.trackPageView('home');
  }, []);

  const handleFormSubmit = (formData) => {
    // Save filters for PDF/email export
    setCurrentFilters(formData);
    
    // Step 1: Filter by industry
    let filteredIdeas = filterIdeasByIndustry(formData.industry);
    
    // Step 2: Filter by budget
    filteredIdeas = filterIdeasByBudget(formData.budget, filteredIdeas);
    
    // Step 3: Filter by audience
    filteredIdeas = filterIdeasByAudience(formData.audience, filteredIdeas);
    
    // Step 4: Rank by relevance to goals
    const rankedIdeas = rankIdeasByRelevance(formData.goals, filteredIdeas);
    
    // Update state with top ideas (limit to 15 total)
    const finalIdeas = rankedIdeas.slice(0, 15);
    setGeneratedIdeas(finalIdeas);
    setHasGenerated(true);
    
    // Track search in analytics
    analytics.trackSearch(formData, finalIdeas.length);
  };
  
  const handleNewSearch = () => {
    setHasGenerated(false);
    
    // Track this action in analytics
    analytics.trackPageView('new_search');
  };
  
  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };
  
  // Show the help/onboarding guide manually
  const handleShowHelp = () => {
    setShowOnboarding(true);
    
    // Track this action in analytics
    analytics.trackPageView('help_guide');
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Fan Engagement Idea Generator</h1>
        <p className="app-subtitle">Discover creative ways to engage your audience beyond your core product</p>
      </header>
      
      {!hasGenerated ? (
        <InputForm onSubmit={handleFormSubmit} />
      ) : (
        <>
          <IdeasDisplay ideas={generatedIdeas} filters={currentFilters} />
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <button 
              className="submit-button"
              onClick={handleNewSearch}
            >
              Generate New Ideas
            </button>
          </div>
        </>
      )}
      
      <footer>
        <p>
          This tool provides inspiration for engagement strategies. 
          Adapt ideas to your specific needs and brand.
          <button 
            className="text-button" 
            onClick={handleShowHelp}
            style={{ marginLeft: '10px' }}
          >
            Need Help?
          </button>
        </p>
      </footer>
      
      {/* Onboarding Guide */}
      {showOnboarding && (
        <OnboardingGuide onComplete={handleOnboardingComplete} />
      )}
    </div>
  );
};

export default App;