import React, { useState } from 'react';
import '../styles.css';

/**
 * OnboardingGuide component that provides a step-by-step introduction
 * to the Fan Engagement Idea Generator for first-time users
 */
const OnboardingGuide = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  // Define the steps in the onboarding process
  const steps = [
    {
      title: "Welcome to the Fan Engagement Idea Generator",
      content: "This tool helps you discover tailored fan engagement strategies based on your specific needs. Let's walk through how to use it.",
      image: "/images/welcome.png"
    },
    {
      title: "Step 1: Input Your Information",
      content: "Start by telling us about your organization, target audience, and goals. The more specific you are, the better we can match ideas to your needs.",
      image: "/images/input-form.png"
    },
    {
      title: "Step 2: Review Your Matched Ideas",
      content: "We'll show you engagement ideas that match your criteria, organized by category. Each idea includes implementation details and real-world examples.",
      image: "/images/ideas-display.png"
    },
    {
      title: "Step 3: Export and Share",
      content: "Found ideas you like? Export them as a PDF report or share them via email with your team to start planning your fan engagement strategy.",
      image: "/images/export-options.png"
    },
    {
      title: "Ready to Get Started?",
      content: "You can revisit this guide anytime by clicking the 'Help' button. Let's find some great engagement ideas for your fans!",
      image: "/images/get-started.png"
    }
  ];
  
  // Move to the next step
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete the onboarding process
      onComplete();
    }
  };
  
  // Move to the previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Skip the onboarding process
  const skipOnboarding = () => {
    onComplete();
  };
  
  return (
    <div className="onboarding-overlay">
      <div className="onboarding-modal">
        <div className="onboarding-header">
          <div className="step-indicator">
            {steps.map((_, index) => (
              <div 
                key={index} 
                className={`step-dot ${index === currentStep ? 'active' : ''}`}
                onClick={() => setCurrentStep(index)}
              />
            ))}
          </div>
          <button className="close-button" onClick={skipOnboarding}>×</button>
        </div>
        
        <div className="onboarding-content">
          <h2>{steps[currentStep].title}</h2>
          
          {steps[currentStep].image && (
            <div className="onboarding-image">
              <img 
                src={steps[currentStep].image} 
                alt={`Illustration for ${steps[currentStep].title}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/placeholder.png";
                }}
              />
            </div>
          )}
          
          <p>{steps[currentStep].content}</p>
        </div>
        
        <div className="onboarding-footer">
          {currentStep > 0 && (
            <button className="secondary-button" onClick={prevStep}>
              Previous
            </button>
          )}
          
          <button className="primary-button" onClick={nextStep}>
            {currentStep < steps.length - 1 ? 'Next' : 'Get Started'}
          </button>
          
          {currentStep < steps.length - 1 && (
            <button className="text-button" onClick={skipOnboarding}>
              Skip Tutorial
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingGuide;