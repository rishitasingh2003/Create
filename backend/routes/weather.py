from fastapi import APIRouter, HTTPException, Query
from typing import Optional, Dict, Any, List
import aiohttp
import os
from datetime import datetime, timedelta
import asyncio

router = APIRouter()

# MongoDB connection
from server import db

# Mock weather data for free tier simulation
MOCK_WEATHER_DATA = {
    "Delhi": {
        "current": {
            "temperature": 28,
            "humidity": 65,
            "windSpeed": 12,
            "condition": "Partly Cloudy",
            "conditionHindi": "आंशिक बादल"
        },
        "forecast": [
            {"day": "Today", "dayHindi": "आज", "high": 30, "low": 22, "condition": "Sunny", "conditionHindi": "धूप"},
            {"day": "Tomorrow", "dayHindi": "कल", "high": 28, "low": 20, "condition": "Cloudy", "conditionHindi": "बादल"},
            {"day": "Day 3", "dayHindi": "तीसरा दिन", "high": 25, "low": 18, "condition": "Rain", "conditionHindi": "बारिश"},
            {"day": "Day 4", "dayHindi": "चौथा दिन", "high": 27, "low": 19, "condition": "Partly Cloudy", "conditionHindi": "आंशिक बादल"},
            {"day": "Day 5", "dayHindi": "पांचवा दिन", "high": 29, "low": 21, "condition": "Sunny", "conditionHindi": "धूप"},
            {"day": "Day 6", "dayHindi": "छठा दिन", "high": 31, "low": 23, "condition": "Hot", "conditionHindi": "गर्म"},
            {"day": "Day 7", "dayHindi": "सातवां दिन", "high": 26, "low": 20, "condition": "Rain", "conditionHindi": "बारिश"}
        ]
    },
    "Mumbai": {
        "current": {
            "temperature": 32,
            "humidity": 75,
            "windSpeed": 15,
            "condition": "Hot",
            "conditionHindi": "गर्म"
        },
        "forecast": [
            {"day": "Today", "dayHindi": "आज", "high": 33, "low": 26, "condition": "Hot", "conditionHindi": "गर्म"},
            {"day": "Tomorrow", "dayHindi": "कल", "high": 31, "low": 25, "condition": "Partly Cloudy", "conditionHindi": "आंशिक बादल"},
            {"day": "Day 3", "dayHindi": "तीसरा दिन", "high": 29, "low": 24, "condition": "Rain", "conditionHindi": "बारिश"},
            {"day": "Day 4", "dayHindi": "चौथा दिन", "high": 30, "low": 25, "condition": "Cloudy", "conditionHindi": "बादल"},
            {"day": "Day 5", "dayHindi": "पांचवा दिन", "high": 32, "low": 26, "condition": "Sunny", "conditionHindi": "धूप"},
            {"day": "Day 6", "dayHindi": "छठा दिन", "high": 34, "low": 27, "condition": "Hot", "conditionHindi": "गर्म"},
            {"day": "Day 7", "dayHindi": "सातवां दिन", "high": 28, "low": 23, "condition": "Rain", "conditionHindi": "बारिश"}
        ]
    }
}

@router.get("/weather")
async def get_current_weather(location: Optional[str] = Query("Delhi")):
    """Get current weather for a location"""
    try:
        # For now, using mock data (free tier simulation)
        # In production, this would integrate with OpenWeatherMap API
        
        weather_data = MOCK_WEATHER_DATA.get(location, MOCK_WEATHER_DATA["Delhi"])
        
        # Cache weather data in database for better performance
        cache_key = f"weather_{location}_{datetime.now().strftime('%Y%m%d')}"
        await db.weather_cache.update_one(
            {"cache_key": cache_key},
            {
                "$set": {
                    "cache_key": cache_key,
                    "location": location,
                    "data": weather_data,
                    "updated_at": datetime.utcnow(),
                    "expires_at": datetime.utcnow() + timedelta(hours=1)
                }
            },
            upsert=True
        )
        
        return {
            "location": location,
            "current": weather_data["current"],
            "forecast": weather_data["forecast"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/weather/forecast")
async def get_weather_forecast(
    location: Optional[str] = Query("Delhi"),
    days: Optional[int] = Query(7)
):
    """Get weather forecast for specified days"""
    try:
        weather_data = MOCK_WEATHER_DATA.get(location, MOCK_WEATHER_DATA["Delhi"])
        
        # Limit forecast to requested days
        forecast = weather_data["forecast"][:days]
        
        return {
            "location": location,
            "forecast": forecast,
            "days": len(forecast)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/weather/locations")
async def get_available_locations():
    """Get list of available weather locations"""
    try:
        locations = list(MOCK_WEATHER_DATA.keys())
        return {"locations": locations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def get_external_weather_data(location: str, api_key: str) -> Dict[str, Any]:
    """
    Future implementation for OpenWeatherMap API integration
    This function would be used when API key is available
    """
    base_url = "http://api.openweathermap.org/data/2.5"
    
    try:
        async with aiohttp.ClientSession() as session:
            # Current weather
            current_url = f"{base_url}/weather?q={location}&appid={api_key}&units=metric"
            async with session.get(current_url) as response:
                current_data = await response.json()
            
            # 7-day forecast
            forecast_url = f"{base_url}/forecast?q={location}&appid={api_key}&units=metric&cnt=7"
            async with session.get(forecast_url) as response:
                forecast_data = await response.json()
            
            return {
                "current": current_data,
                "forecast": forecast_data
            }
    except Exception as e:
        # Fallback to mock data
        return MOCK_WEATHER_DATA.get(location, MOCK_WEATHER_DATA["Delhi"])