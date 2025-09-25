# KrishiSahyog Backend Integration Contracts

## API Contracts

### 1. Government Schemes API
```
GET /api/schemes
- Query params: category?, state?, search?
- Response: Array of scheme objects

GET /api/schemes/:id
- Response: Single scheme object

Scheme Object:
{
  id: string,
  name: { hindi: string, english: string },
  description: { hindi: string, english: string },
  eligibility: { hindi: string, english: string },
  state: string,
  category: string,
  link: string,
  createdAt: Date,
  updatedAt: Date
}
```

### 2. Crop Guidance API
```
GET /api/crops
- Query params: season?, soilType?, region?
- Response: Array of crop objects

GET /api/crops/:id
- Response: Single crop object

Crop Object:
{
  id: string,
  crop: { hindi: string, english: string },
  season: { hindi: string, english: string },
  soilType: { hindi: string, english: string },
  sowingTime: { hindi: string, english: string },
  harvestTime: { hindi: string, english: string },
  tips: { hindi: string, english: string },
  region: string,
  createdAt: Date,
  updatedAt: Date
}
```

### 3. Weather API
```
GET /api/weather
- Query params: location?
- Response: Weather object

GET /api/weather/forecast
- Query params: location?, days?
- Response: Forecast array

Weather Object:
{
  location: string,
  current: {
    temperature: number,
    humidity: number,
    windSpeed: number,
    condition: string,
    conditionHindi: string
  },
  forecast: [{
    day: string,
    dayHindi: string,
    high: number,
    low: number,
    condition: string,
    conditionHindi: string
  }]
}
```

### 4. Market Prices API
```
GET /api/market
- Query params: commodity?, market?, date?
- Response: Array of market data

Market Data Object:
{
  id: string,
  commodity: { hindi: string, english: string },
  market: string,
  price: number,
  unit: string,
  change: string,
  date: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### 5. AI Assistant API
```
GET /api/ai/questions
- Query params: category?
- Response: Array of Q&A objects

POST /api/ai/chat
- Body: { question: string, language: string }
- Response: { answer: string, category: string }

Q&A Object:
{
  id: string,
  question: { hindi: string, english: string },
  answer: { hindi: string, english: string },
  category: string,
  createdAt: Date,
  updatedAt: Date
}
```

### 6. Storage Guidance API
```
GET /api/storage
- Query params: item?
- Response: Array of storage guidance

Storage Object:
{
  id: string,
  item: { hindi: string, english: string },
  tips: [{ hindi: string, english: string }],
  createdAt: Date,
  updatedAt: Date
}
```

## Mock Data to Replace

### From mockData.js:
1. **governmentSchemes** → Replace with database queries to schemes collection
2. **cropGuidanceData** → Replace with database queries to crops collection  
3. **weatherData** → Replace with external weather API or cached weather data
4. **marketData** → Replace with database queries to market_prices collection
5. **aiQuestionsAnswers** → Replace with database queries to qa_pairs collection
6. **storageGuidance** → Replace with database queries to storage_guidance collection

## Backend Implementation Plan

### 1. Database Models (MongoDB)
- **Scheme**: Government schemes data
- **Crop**: Crop guidance information
- **Weather**: Cached weather data (with external API integration)
- **MarketPrice**: Market/mandi price data
- **QAPair**: FAQ pairs for AI assistant
- **StorageGuide**: Storage guidance tips

### 2. External API Integrations
- **Weather API**: OpenWeatherMap free tier for weather data
- **Market API**: Mock implementation initially, can integrate with government APIs later

### 3. Core Backend Features
- CRUD operations for all data models
- Search and filtering capabilities
- Bilingual content management
- Caching for weather data
- Error handling and validation
- Database indexing for performance

## Frontend Integration Changes

### Files to Update:
1. **Remove mock data imports** from all pages
2. **Add API service layer** (`src/services/api.js`)
3. **Update data fetching** in all page components
4. **Add loading states** and error handling
5. **Update context** for real-time data updates

### API Service Structure:
```javascript
// src/services/api.js
export const schemeService = {
  getAll: (params) => axios.get('/api/schemes', { params }),
  getById: (id) => axios.get(`/api/schemes/${id}`)
};

export const cropService = {
  getAll: (params) => axios.get('/api/crops', { params }),
  getById: (id) => axios.get(`/api/crops/${id}`)
};

// Similar services for weather, market, ai, storage
```

### State Management Updates:
- Add loading states for all data fetching
- Implement error handling with user-friendly messages
- Add data caching for better performance
- Update language context to work with API responses

## Testing Strategy
1. **Backend API Testing**: Test all CRUD operations, search, filtering
2. **Integration Testing**: Verify frontend-backend communication
3. **Data Validation**: Ensure bilingual content integrity
4. **Performance Testing**: Check API response times
5. **Error Handling**: Test error scenarios and user feedback

## Deployment Considerations
- Environment variables for external API keys
- Database indexing for search performance
- API rate limiting for external services
- Caching strategy for frequently accessed data
- Backup strategy for critical data

This contract ensures seamless integration between frontend and backend while maintaining the bilingual functionality and user experience.