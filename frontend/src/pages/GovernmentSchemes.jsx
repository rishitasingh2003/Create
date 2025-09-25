import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useLanguage } from '../contexts/LanguageContext';
import { governmentSchemes } from '../data/mockData';
import { Building2, ExternalLink, Search, Filter } from 'lucide-react';

const GovernmentSchemes = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterState, setFilterState] = useState('all');

  const filteredSchemes = governmentSchemes.filter(scheme => {
    const matchesSearch = scheme.name.hindi.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.name.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.hindi.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.english.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || scheme.category === filterCategory;
    const matchesState = filterState === 'all' || scheme.state === filterState;
    
    return matchesSearch && matchesCategory && matchesState;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-green-600 p-4 rounded-full w-20 h-20 mx-auto mb-6">
            <Building2 className="h-12 w-12 text-white mx-auto" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('सरकारी योजनाएं', 'Government Schemes')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t(
              'किसानों के लिए केंद्र और राज्य सरकार की नवीनतम योजनाओं की संपूर्ण जानकारी',
              'Complete information about latest central and state government schemes for farmers'
            )}
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder={t('योजना खोजें...', 'Search schemes...')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-lg py-6"
                />
              </div>
            </div>
            <div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="text-lg py-6">
                  <Filter className="h-5 w-5 mr-2" />
                  <SelectValue placeholder={t('श्रेणी', 'Category')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('सभी श्रेणी', 'All Categories')}</SelectItem>
                  <SelectItem value="Financial Support">{t('वित्तीय सहायता', 'Financial Support')}</SelectItem>
                  <SelectItem value="Insurance">{t('बीमा', 'Insurance')}</SelectItem>
                  <SelectItem value="Equipment">{t('उपकरण', 'Equipment')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={filterState} onValueChange={setFilterState}>
                <SelectTrigger className="text-lg py-6">
                  <SelectValue placeholder={t('राज्य', 'State')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('सभी राज्य', 'All States')}</SelectItem>
                  <SelectItem value="Central">{t('केंद्र सरकार', 'Central Government')}</SelectItem>
                  <SelectItem value="UP">{t('उत्तर प्रदेश', 'Uttar Pradesh')}</SelectItem>
                  <SelectItem value="Maharashtra">{t('महाराष्ट्र', 'Maharashtra')}</SelectItem>
                  <SelectItem value="Punjab">{t('पंजाब', 'Punjab')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 text-lg">
            {t(`${filteredSchemes.length} योजनाएं मिलीं`, `Found ${filteredSchemes.length} schemes`)}
          </p>
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => (
            <Card key={scheme.id} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-green-300">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {scheme.category}
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {scheme.state}
                  </span>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 leading-tight">
                  {t(scheme.name.hindi, scheme.name.english)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  {t(scheme.description.hindi, scheme.description.english)}
                </CardDescription>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">
                    {t('पात्रता:', 'Eligibility:')}
                  </h4>
                  <p className="text-gray-600">
                    {t(scheme.eligibility.hindi, scheme.eligibility.english)}
                  </p>
                </div>

                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => window.open(scheme.link, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {t('विस्तार से पढ़ें', 'Read More')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSchemes.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600 mb-2">
              {t('कोई योजना नहीं मिली', 'No schemes found')}
            </p>
            <p className="text-gray-500">
              {t('अपने खोज मापदंड बदलकर देखें', 'Try changing your search criteria')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GovernmentSchemes;