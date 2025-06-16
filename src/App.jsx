import React, { useState } from 'react';
import InputForm from './components/InputForm';
import IdeasDisplay from './components/IdeasDisplay';
import { 
  filterIdeasByIndustry, 
  filterIdeasByBudget, 
  filterIdeasByAudience,
  rankIdeasByRelevance
} from './utils/ideasDatabase';
import './styles.css';

const App = () => {
  const [generatedIdeas, setGeneratedIdeas] = useState([]);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleFormSubmit = (formData) => {
    // Step 1: Filter by industry
    let filteredIdeas = filterIdeasByIndustry(formData.industry);
    
    // Step 2: Filter by budget
    filteredIdeas = filterIdeasByBudget(formData.budget, filteredIdeas);
    
    // Step 3: Filter by audience
    filteredIdeas = filterIdeasByAudience(formData.audience, filteredIdeas);
    
    // Step 4: Rank by relevance to goals
    const rankedIdeas = rankIdeasByRelevance(formData.goals, filteredIdeas);
    
    // Update state with top ideas (limit to 15 total)
    setGeneratedIdeas(rankedIdeas.slice(0, 15));
    setHasGenerated(true);
  };

  return (
    <div className="fan-engagement-app">
      <header>
        <h1>Fan Engagement Idea Generator</h1>
        <p>Discover creative ways to engage your audience beyond your core product</p>
      </header>
      
      {!hasGenerated ? (
        <InputForm onSubmit={handleFormSubmit} />
      ) : (
        <>
          <IdeasDisplay ideas={generatedIdeas} />
          <button 
            className="reset-button"
            onClick={() => setHasGenerated(false)}
          >
            Generate New Ideas
          </button>
        </>
      )}
      
      <footer>
        <p>This tool provides inspiration for engagement strategies. Adapt ideas to your specific needs and brand.</p>
      </footer>
    </div>
  );
};

export default App;