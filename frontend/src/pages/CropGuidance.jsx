import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { cropGuidanceData } from '../data/mockData';
import { Sprout, Calendar, Droplets, Thermometer, HelpCircle } from 'lucide-react';

const CropGuidance = () => {
  const { t } = useLanguage();
  const [selectedSeason, setSelectedSeason] = useState('all');

  const filteredCrops = cropGuidanceData.filter(crop => 
    selectedSeason === 'all' || crop.season.english.toLowerCase() === selectedSeason.toLowerCase()
  );

  const faqs = [
    {
      question: t('खाद कब डालें?', 'When to apply fertilizer?'),
      answer: t('बुआई के समय और फूल आने से पहले खाद डालना चाहिए।', 'Fertilizer should be applied at sowing time and before flowering.')
    },
    {
      question: t('सिंचाई कितनी बार करें?', 'How often to irrigate?'),
      answer: t('मिट्टी की नमी और मौसम के अनुसार 7-10 दिन में सिंचाई करें।', 'Irrigate every 7-10 days based on soil moisture and weather.')
    },
    {
      question: t('कीटनाशक कैसे चुनें?', 'How to choose pesticides?'),
      answer: t('कृषि विशेषज्ञ की सलाह लेकर जैविक कीटनाशक का प्रयोग करें।', 'Use organic pesticides with advice from agricultural experts.')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-green-600 p-4 rounded-full w-20 h-20 mx-auto mb-6">
            <Sprout className="h-12 w-12 text-white mx-auto" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('फसल और मिट्टी मार्गदर्शन', 'Crop & Soil Guidance')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t(
              'मिट्टी, मौसम और क्षेत्र के अनुसार सबसे उपयुक्त फसल की जानकारी',
              'Best crop recommendations based on soil, weather and region'
            )}
          </p>
        </div>

        {/* Season Filter */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <div className="flex space-x-2">
              <Button
                variant={selectedSeason === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedSeason('all')}
                className={selectedSeason === 'all' ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                {t('सभी मौसम', 'All Seasons')}
              </Button>
              <Button
                variant={selectedSeason === 'rabi' ? 'default' : 'outline'}
                onClick={() => setSelectedSeason('rabi')}
                className={selectedSeason === 'rabi' ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                {t('रबी', 'Rabi')}
              </Button>
              <Button
                variant={selectedSeason === 'kharif' ? 'default' : 'outline'}
                onClick={() => setSelectedSeason('kharif')}
                className={selectedSeason === 'kharif' ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                {t('खरीफ', 'Kharif')}
              </Button>
            </div>
          </div>
        </div>

        {/* Crop Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredCrops.map((crop) => (
            <Card key={crop.id} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-green-300">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <Sprout className="h-8 w-8 text-green-600 mr-3" />
                  {t(crop.crop.hindi, crop.crop.english)}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {t(crop.season.hindi, crop.season.english)}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <Calendar className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-700">{t('बुआई', 'Sowing')}</p>
                    <p className="text-sm text-gray-600">{t(crop.sowingTime.hindi, crop.sowingTime.english)}</p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <Calendar className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-700">{t('कटाई', 'Harvest')}</p>
                    <p className="text-sm text-gray-600">{t(crop.harvestTime.hindi, crop.harvestTime.english)}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="h-5 w-5 text-red-500" />
                    <span className="font-medium">{t('मिट्टी:', 'Soil:')}</span>
                    <span className="text-gray-600">{t(crop.soilType.hindi, crop.soilType.english)}</span>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="font-medium text-green-800 mb-2">{t('सलाह:', 'Advice:')}</p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {t(crop.tips.hindi, crop.tips.english)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center mb-8">
            <HelpCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('अक्सर पूछे जाने वाले प्रश्न', 'Frequently Asked Questions')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900">
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button className="bg-green-600 hover:bg-green-700 px-8 py-3">
              <HelpCircle className="h-5 w-5 mr-2" />
              {t('और प्रश्न पूछें', 'Ask More Questions')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropGuidance;