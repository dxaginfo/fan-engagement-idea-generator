# Setup and Installation Guide

This guide will help you set up and run the Fan Engagement Idea Generator locally or deploy it to a production environment.

## Local Development Setup

### Prerequisites
- Node.js (v14 or later)
- npm or yarn package manager
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/dxaginfo/fan-engagement-idea-generator.git
   cd fan-engagement-idea-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or if using yarn
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or if using yarn
   yarn start
   ```

4. **View the application**
   Open your browser and navigate to `http://localhost:3000`

### Project Structure
```
fan-engagement-idea-generator/
├── public/               # Static files
│   └── index.html        # HTML template
├── src/                  # Source code
│   ├── components/       # React components
│   │   ├── InputForm.jsx # User input form
│   │   └── IdeasDisplay.jsx # Results display
│   ├── data/             # Data files
│   │   └── engagement-ideas.json # Ideas database
│   ├── utils/            # Utility functions
│   │   └── ideasDatabase.js # Database operations
│   ├── App.jsx           # Main application component
│   ├── index.js          # Application entry point
│   └── styles.css        # Global styles
└── package.json          # Project dependencies and scripts
```

## Customization Guide

### Adding New Engagement Ideas
To expand the database of engagement ideas, edit the `src/data/engagement-ideas.json` file following the established schema:

```json
{
  "id": "idea-xxx",
  "title": "Your Idea Title",
  "description": "Brief description of the engagement idea",
  "category": "digital|social|community|experiential|technology",
  "budgetRange": ["low|medium|high"],
  "audienceTypes": ["hardcore fans", "casual fans", "youth", "families", "professionals", "seniors"],
  "industryFit": ["sports", "entertainment", "consumer", "media", "nonprofit"],
  "implementationComplexity": "low|medium|high",
  "expectedOutcomes": ["brand awareness", "brand loyalty", "social media growth", "direct revenue", "data collection", "community building"],
  "resourceRequirements": ["list", "of", "resources", "needed"],
  "exampleCase": "Real-world example of this idea in action"
}
```

### Modifying the Filtering Logic
The filtering logic is contained in `src/utils/ideasDatabase.js`. You can modify these functions to change how ideas are filtered and ranked:

- `filterIdeasByIndustry`: Change how ideas are matched to selected industries
- `filterIdeasByBudget`: Adjust budget filtering criteria
- `filterIdeasByAudience`: Modify audience matching algorithm
- `rankIdeasByRelevance`: Update relevance scoring for better idea ranking

### Styling Customization
To change the visual appearance of the application:

1. **Colors and Fonts**: Edit the CSS variables at the top of `src/styles.css`:
   ```css
   :root {
     --primary-color: #3498db;  /* Main brand color */
     --secondary-color: #2c3e50; /* Secondary color */
     --accent-color: #e74c3c; /* Accent color for buttons, etc. */
     /* Other variables... */
   }
   ```

2. **Component Styling**: Each component has its own styling section in the CSS file. Look for comments like `/* Form Styling */` or `/* Results Display Styling */` to find the relevant sections.

## Deployment Guide

### Deploying to GitHub Pages

1. **Install gh-pages package**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deployment scripts to package.json**
   ```json
   "scripts": {
     // other scripts...
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   },
   "homepage": "https://yourusername.github.io/fan-engagement-idea-generator"
   ```

3. **Deploy the application**
   ```bash
   npm run deploy
   ```

### Deploying to Netlify

1. **Create a `netlify.toml` file in the root directory**
   ```toml
   [build]
     publish = "build"
     command = "npm run build"
   ```

2. **Manual Deployment**
   - Build the application: `npm run build`
   - Drag and drop the `build` folder to Netlify's manual deploy section

3. **Git-based Deployment**
   - Push your repository to GitHub
   - Connect Netlify to your GitHub repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `build`

### Deploying to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy the application**
   ```bash
   vercel
   ```

3. **Alternative: Git-based Deployment**
   - Push your repository to GitHub
   - Import the project in the Vercel dashboard
   - Vercel will automatically detect React settings

## Performance Optimization

For larger idea databases, consider these optimizations:

1. **Lazy Loading Components**
   ```javascript
   // In App.jsx
   const IdeasDisplay = React.lazy(() => import('./components/IdeasDisplay'));

   // Then use with Suspense
   <React.Suspense fallback={<div>Loading...</div>}>
     <IdeasDisplay ideas={generatedIdeas} />
   </React.Suspense>
   ```

2. **Memoization for Expensive Calculations**
   ```javascript
   // In ideasDatabase.js
   import { memoize } from 'lodash';

   export const rankIdeasByRelevance = memoize((userGoals, ideas) => {
     // Existing ranking logic
   });
   ```

3. **Pagination for Large Result Sets**
   If you expand beyond 30 ideas, consider adding pagination to the results display.

## Troubleshooting

### Common Issues

1. **"Module not found" errors**
   - Ensure all dependencies are installed: `npm install`
   - Check import paths for typos

2. **Styling issues on different browsers**
   - Add appropriate browser prefixes to CSS
   - Consider using a tool like Autoprefixer

3. **Performance issues with large datasets**
   - Implement the optimization techniques mentioned above
   - Consider server-side filtering for very large datasets

## Getting Help

If you encounter issues with the Fan Engagement Idea Generator:

1. Check the existing [issues on GitHub](https://github.com/dxaginfo/fan-engagement-idea-generator/issues)
2. Create a new issue with detailed information about your problem
3. Include your environment details (browser, Node.js version, etc.)