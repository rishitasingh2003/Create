import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { weatherData } from '../data/mockData';
import { CloudSun, Droplets, Wind, Thermometer, MapPin, Calendar } from 'lucide-react';

const WeatherUpdates = () => {
  const { t } = useLanguage();
  const [selectedLocation, setSelectedLocation] = useState('Delhi');

  const locations = ['Delhi', 'Mumbai', 'Chennai', 'Kolkata', 'Bangalore', 'Hyderabad'];

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'धूप':
        return '☀️';
      case 'cloudy':
      case 'बादल':
        return '☁️';
      case 'rain':
      case 'बारिश':
        return '🌧️';
      case 'partly cloudy':
      case 'आंशिक बादल':
        return '⛅';
      case 'hot':
      case 'गर्म':
        return '🌞';
      default:
        return '🌤️';
    }
  };

  const farmingTips = [
    {
      weather: t('धूप', 'Sunny'),
      tip: t('सिंचाई का समय सुबह या शाम करें। दोपहर में काम से बचें।', 'Irrigate in morning or evening. Avoid work during noon.')
    },
    {
      weather: t('बारिश', 'Rain'),
      tip: t('खेत में जल निकासी की व्यवस्था करें। कीटनाशक का छिड़काव न करें।', 'Ensure field drainage. Avoid pesticide spraying.')
    },
    {
      weather: t('बादल', 'Cloudy'),
      tip: t('फसल की देखभाल और निराई-गुड़ाई का अच्छा समय है।', 'Good time for crop care and weeding.')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-orange-600 p-4 rounded-full w-20 h-20 mx-auto mb-6">
            <CloudSun className="h-12 w-12 text-white mx-auto" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('मौसम अपडेट', 'Weather Updates')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t(
              '7 दिन का मौसम पूर्वानुमान और खेती के लिए मौसम संबंधी सलाह',
              '7-day weather forecast and weather-related farming advice'
            )}
          </p>
        </div>

        {/* Location Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <div className="flex items-center space-x-4">
              <MapPin className="h-5 w-5 text-gray-600" />
              <select 
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="text-lg font-medium border-none bg-transparent focus:outline-none"
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Current Weather */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    {t('आज का मौसम', 'Today\'s Weather')}
                  </h2>
                  <p className="text-xl mb-4">{selectedLocation}</p>
                  <div className="flex items-center text-6xl font-bold mb-4">
                    {weatherData.current.temperature}°C
                  </div>
                  <p className="text-xl">
                    {t(weatherData.current.conditionHindi, weatherData.current.condition)}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center mb-2">
                      <Droplets className="h-6 w-6 mr-2" />
                      <span className="font-medium">{t('नमी', 'Humidity')}</span>
                    </div>
                    <p className="text-2xl font-bold">{weatherData.current.humidity}%</p>
                  </div>
                  
                  <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center mb-2">
                      <Wind className="h-6 w-6 mr-2" />
                      <span className="font-medium">{t('हवा', 'Wind')}</span>
                    </div>
                    <p className="text-2xl font-bold">{weatherData.current.windSpeed} km/h</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 7-Day Forecast */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            {t('7 दिन का पूर्वानुमान', '7-Day Forecast')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            {weatherData.forecast.map((day, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 text-center">
                <CardContent className="p-4">
                  <p className="font-medium text-gray-700 mb-2">
                    {t(day.dayHindi, day.day)}
                  </p>
                  
                  <div className="text-4xl mb-3">
                    {getWeatherIcon(day.condition)}
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-xl font-bold text-gray-900">
                      {day.high}°
                    </p>
                    <p className="text-sm text-gray-600">
                      {day.low}°
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {t(day.conditionHindi, day.condition)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Farming Tips Based on Weather */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('मौसम के अनुसार खेती की सलाह', 'Weather-Based Farming Tips')}
            </h2>
            <p className="text-gray-600">
              {t('मौसम की स्थिति के आधार पर खेती संबंधी महत्वपूर्ण सुझाव', 'Important farming suggestions based on weather conditions')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {farmingTips.map((tip, index) => (
              <Card key={index} className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 flex items-center">
                    <CloudSun className="h-5 w-5 text-orange-600 mr-2" />
                    {tip.weather}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {tip.tip}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Weather Alerts */}
        <div className="mt-8">
          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-xl text-yellow-800 flex items-center">
                <Calendar className="h-6 w-6 mr-2" />
                {t('मौसम चेतावनी', 'Weather Alert')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-yellow-700">
                {t(
                  'अगले 3 दिनों में भारी बारिश की संभावना है। फसल की सुरक्षा के लिए आवश्यक तैयारी करें।',
                  'Heavy rainfall expected in next 3 days. Make necessary preparations for crop protection.'
                )}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WeatherUpdates;