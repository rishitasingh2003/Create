import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { Sprout, Globe } from 'lucide-react';

const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  const navItems = [
    { 
      path: '/schemes', 
      label: t('सरकारी योजनाएं', 'Government Schemes'),
      icon: 'building'
    },
    { 
      path: '/crop-guidance', 
      label: t('फसल मार्गदर्शन', 'Crop Guidance'),
      icon: 'seedling'
    },
    { 
      path: '/weather', 
      label: t('मौसम अपडेट', 'Weather Updates'),
      icon: 'cloud'
    },
    { 
      path: '/storage-market', 
      label: t('भंडारण और बाजार', 'Storage & Market'),
      icon: 'warehouse'
    },
    { 
      path: '/ai-assistant', 
      label: t('AI सहायक', 'AI Assistant'),
      icon: 'robot'
    }
  ];

  return (
    <header className="bg-white shadow-lg border-b-4 border-green-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
            <div className="bg-green-600 p-2 rounded-xl">
              <Sprout className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-800">
                {t('कृषि सहयोग', 'KrishiSahyog')}
              </h1>
              <p className="text-sm text-green-600">
                {t('किसानों का साथी', 'Farmer\'s Companion')}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-green-700 hover:bg-green-100 hover:text-green-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Language Toggle */}
          <Button
            onClick={toggleLanguage}
            variant="outline"
            size="sm"
            className="border-green-600 text-green-700 hover:bg-green-50"
          >
            <Globe className="h-4 w-4 mr-2" />
            {language === 'hindi' ? 'English' : 'हिंदी'}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden pb-4">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-center ${
                  location.pathname === item.path
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-green-700 hover:bg-green-100 hover:text-green-800 border border-green-200'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;