import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { marketData, storageGuidance } from '../data/mockData';
import { Warehouse, TrendingUp, TrendingDown, Calendar, MapPin, Package } from 'lucide-react';

const StorageMarket = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('market');

  const TabButton = ({ id, label, isActive, onClick }) => (
    <Button
      variant={isActive ? 'default' : 'outline'}
      onClick={() => onClick(id)}
      className={`px-6 py-3 text-lg ${
        isActive 
          ? 'bg-green-600 hover:bg-green-700 text-white' 
          : 'text-green-700 hover:bg-green-50'
      }`}
    >
      {label}
    </Button>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-purple-600 p-4 rounded-full w-20 h-20 mx-auto mb-6">
            <Warehouse className="h-12 w-12 text-white mx-auto" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('भंडारण और बाजार जानकारी', 'Storage & Market Information')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t(
              'मंडी के भाव और फसल भंडारण की संपूर्ण जानकारी',
              'Complete information about mandi prices and crop storage'
            )}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-2 rounded-xl shadow-lg">
            <div className="flex space-x-2">
              <TabButton
                id="market"
                label={t('मंडी भाव', 'Market Prices')}
                isActive={activeTab === 'market'}
                onClick={setActiveTab}
              />
              <TabButton
                id="storage"
                label={t('भंडारण गाइड', 'Storage Guide')}
                isActive={activeTab === 'storage'}
                onClick={setActiveTab}
              />
            </div>
          </div>
        </div>

        {/* Market Prices Tab */}
        {activeTab === 'market' && (
          <div>
            {/* Market Prices Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t('आज के मंडी भाव', 'Today\'s Market Prices')}
              </h2>
              <p className="text-gray-600 flex items-center justify-center">
                <Calendar className="h-5 w-5 mr-2" />
                {new Date().toLocaleDateString('hi-IN')}
              </p>
            </div>

            {/* Price Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {marketData.map((item) => (
                <Card key={item.id} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-green-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl font-bold text-gray-900">
                        {t(item.commodity.hindi, item.commodity.english)}
                      </CardTitle>
                      <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        item.change.startsWith('+') 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.change.startsWith('+') 
                          ? <TrendingUp className="h-4 w-4 mr-1" />
                          : <TrendingDown className="h-4 w-4 mr-1" />
                        }
                        {item.change}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-gray-900">
                        ₹{item.price.toLocaleString()}
                      </p>
                      <p className="text-gray-600">{item.unit}</p>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{item.market}</span>
                    </div>
                    
                    <div className="text-center">
                      <Button 
                        variant="outline" 
                        className="w-full border-green-600 text-green-700 hover:bg-green-50"
                      >
                        {t('विस्तृत चार्ट देखें', 'View Detailed Chart')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Market Tips */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-xl text-blue-800">
                  {t('बाजार की सलाह', 'Market Tips')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-blue-700">
                  <li>• {t('बेचने से पहले कई मंडियों के भाव की तुलना करें', 'Compare prices of multiple mandis before selling')}</li>
                  <li>• {t('मौसम के अनुसार फसल बेचने का समय तय करें', 'Decide selling time based on weather conditions')}</li>
                  <li>• {t('सरकारी MSP की जानकारी रखें', 'Stay informed about government MSP')}</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Storage Guide Tab */}
        {activeTab === 'storage' && (
          <div>
            {/* Storage Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t('फसल भंडारण गाइड', 'Crop Storage Guide')}
              </h2>
              <p className="text-gray-600">
                {t('फसल को सही तरीके से भंडारित करने की संपूर्ण जानकारी', 'Complete information on proper crop storage')}
              </p>
            </div>

            {/* Storage Guidelines */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {storageGuidance.map((guide) => (
                <Card key={guide.id} className="hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                      <Package className="h-8 w-8 text-purple-600 mr-3" />
                      {t(guide.item.hindi, guide.item.english)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">
                        {t('भंडारण की सलाह:', 'Storage Tips:')}
                      </h4>
                      <ul className="space-y-2">
                        {guide.tips.map((tip, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-purple-600 mr-2">•</span>
                            <span className="text-gray-700">
                              {t(tip.hindi, tip.english)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* General Storage Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-xl text-green-800">
                    {t('सामान्य भंडारण सिद्धांत', 'General Storage Principles')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-green-700">
                    <li>• {t('नमी का स्तर 12% से कम रखें', 'Keep moisture level below 12%')}</li>
                    <li>• {t('कीट-पतंगों से बचाव करें', 'Protect from pests and insects')}</li>
                    <li>• {t('हवादार जगह का चुनाव करें', 'Choose well-ventilated area')}</li>
                    <li>• {t('नियमित जांच करते रहें', 'Conduct regular inspections')}</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-orange-50 border-orange-200">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-800">
                    {t('भंडारण की सुविधाएं', 'Storage Facilities')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-orange-700">
                    <li>• {t('सरकारी गोदाम की सुविधा', 'Government warehouse facilities')}</li>
                    <li>• {t('कोल्ड स्टोरेज की जानकारी', 'Cold storage information')}</li>
                    <li>• {t('कृषि बीमा की सुरक्षा', 'Agricultural insurance protection')}</li>
                    <li>• {t('ऑनलाइन बुकिंग सिस्टम', 'Online booking system')}</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Storage Facilities Finder */}
            <Card className="mt-8 bg-purple-50 border-purple-200">
              <CardHeader>
                <CardTitle className="text-xl text-purple-800 text-center">
                  {t('नजदीकी भंडारण सुविधा खोजें', 'Find Nearby Storage Facilities')}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-purple-700 mb-4">
                  {t('अपने क्षेत्र में उपलब्ध भंडारण सुविधाओं की जानकारी पाएं', 'Get information about storage facilities available in your area')}
                </p>
                <Button className="bg-purple-600 hover:bg-purple-700 px-8">
                  <MapPin className="h-5 w-5 mr-2" />
                  {t('सुविधा खोजें', 'Find Facilities')}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default StorageMarket;