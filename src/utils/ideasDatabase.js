import engagementIdeas from '../data/engagement-ideas.json';

// Utility functions to filter and sort ideas based on user criteria
export const filterIdeasByIndustry = (industry) => {
  return engagementIdeas.filter(idea => 
    idea.industryFit.includes(industry.toLowerCase())
  );
};

export const filterIdeasByBudget = (budget, ideas) => {
  return ideas.filter(idea => 
    idea.budgetRange.includes(budget.toLowerCase())
  );
};

export const filterIdeasByAudience = (audience, ideas) => {
  return ideas.filter(idea => 
    idea.audienceTypes.some(type => audience.includes(type))
  );
};

export const rankIdeasByRelevance = (userGoals, ideas) => {
  return ideas.sort((a, b) => {
    const aRelevance = calculateRelevance(a, userGoals);
    const bRelevance = calculateRelevance(b, userGoals);
    return bRelevance - aRelevance;
  });
};

// Helper function to calculate idea relevance score
const calculateRelevance = (idea, userGoals) => {
  let score = 0;
  
  userGoals.forEach(goal => {
    if (idea.expectedOutcomes.includes(goal)) {
      score += 2;
    }
  });
  
  return score;
};