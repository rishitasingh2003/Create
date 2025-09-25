import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Sprout, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { path: '/schemes', label: t('सरकारी योजनाएं', 'Government Schemes') },
    { path: '/crop-guidance', label: t('फसल मार्गदर्शन', 'Crop Guidance') },
    { path: '/weather', label: t('मौसम अपडेट', 'Weather Updates') },
    { path: '/storage-market', label: t('भंडारण और बाजार', 'Storage & Market') }
  ];

  const govLinks = [
    { 
      name: t('कृषि मंत्रालय', 'Ministry of Agriculture'),
      url: 'https://agriculture.gov.in'
    },
    { 
      name: t('PM किसान पोर्टल', 'PM Kisan Portal'),
      url: 'https://pmkisan.gov.in'
    },
    { 
      name: t('भारतीय मौसम विभाग', 'India Meteorological Department'),
      url: 'https://mausam.imd.gov.in'
    },
    { 
      name: t('कृषि विपणन पोर्टल', 'Agricultural Marketing Portal'),
      url: 'https://agmarknet.gov.in'
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-green-600 p-2 rounded-xl">
                <Sprout className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {t('कृषि सहयोग', 'KrishiSahyog')}
                </h1>
                <p className="text-sm text-gray-400">
                  {t('किसानों का साथी', 'Farmer\'s Companion')}
                </p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              {t(
                'आधुनिक तकनीक के साथ किसानों के लिए संपूर्ण समाधान। हमारा उद्देश्य किसानों को सरकारी योजनाओं और कृषि की नवीनतम जानकारी प्रदान करना है।',
                'Complete solutions for farmers with modern technology. Our mission is to provide farmers with government schemes and latest agricultural information.'
              )}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-green-400" />
                <span className="text-gray-300">1800-123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-green-400" />
                <span className="text-gray-300">help@krishisahyog.in</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-green-400" />
                <span className="text-gray-300">{t('नई दिल्ली, भारत', 'New Delhi, India')}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              {t('त्वरित लिंक', 'Quick Links')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-green-400 transition-colors">
                  {t('होम', 'Home')}
                </Link>
              </li>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-green-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/ai-assistant" className="text-gray-400 hover:text-green-400 transition-colors">
                  {t('AI सहायक', 'AI Assistant')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Government Portals */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              {t('सरकारी पोर्टल', 'Government Portals')}
            </h3>
            <ul className="space-y-3">
              {govLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-green-400 transition-colors flex items-center"
                  >
                    {link.name}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About & Legal */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              {t('जानकारी', 'Information')}
            </h3>
            <ul className="space-y-3">
              <li>
                <button className="text-gray-400 hover:text-green-400 transition-colors text-left">
                  {t('हमारे बारे में', 'About Us')}
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-green-400 transition-colors text-left">
                  {t('संपर्क करें', 'Contact Us')}
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-green-400 transition-colors text-left">
                  {t('अस्वीकरण', 'Disclaimer')}
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-green-400 transition-colors text-left">
                  {t('गोपनीयता नीति', 'Privacy Policy')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 {t('कृषि सहयोग', 'KrishiSahyog')}. {t('सभी अधिकार सुरक्षित।', 'All rights reserved.')}
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">
                {t('भारत सरकार द्वारा समर्थित', 'Supported by Government of India')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;