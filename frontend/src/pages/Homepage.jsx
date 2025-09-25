import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Sprout, 
  Building2, 
  CloudSun, 
  Warehouse, 
  MessageCircle, 
  Users, 
  TrendingUp, 
  Shield,
  ArrowRight,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

const Homepage = () => {
  const { t } = useLanguage();

  const quickLinks = [
    {
      title: t('सरकारी योजनाएं', 'Government Schemes'),
      description: t('किसानों के लिए नवीनतम योजनाओं की जानकारी', 'Latest schemes and benefits for farmers'),
      icon: Building2,
      path: '/schemes',
      color: 'bg-blue-600'
    },
    {
      title: t('फसल मार्गदर्शन', 'Crop Guidance'),
      description: t('मिट्टी और मौसम के अनुसार फसल की सलाह', 'Crop recommendations based on soil and weather'),
      icon: Sprout,
      path: '/crop-guidance',
      color: 'bg-green-600'
    },
    {
      title: t('मौसम अपडेट', 'Weather Updates'),
      description: t('7 दिन का मौसम पूर्वानुमान', '7-day weather forecast for farming'),
      icon: CloudSun,
      path: '/weather',
      color: 'bg-orange-600'
    },
    {
      title: t('भंडारण और बाजार', 'Storage & Market'),
      description: t('मंडी भाव और भंडारण की जानकारी', 'Mandi prices and storage guidance'),
      icon: Warehouse,
      path: '/storage-market',
      color: 'bg-purple-600'
    }
  ];

  const features = [
    {
      icon: Users,
      title: t('10 लाख+ किसान', '10 Lakh+ Farmers'),
      description: t('हमारे साथ जुड़े हुए', 'Connected with us')
    },
    {
      icon: TrendingUp,
      title: t('15% अधिक उत्पादन', '15% More Yield'),
      description: t('हमारी सलाह से', 'With our guidance')
    },
    {
      icon: Shield,
      title: t('100% विश्वसनीय', '100% Reliable'),
      description: t('सत्यापित जानकारी', 'Verified information')
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              {t('कृषि सहयोग', 'KrishiSahyog')}
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-green-100 max-w-3xl mx-auto leading-relaxed">
              {t(
                'आधुनिक तकनीक के साथ किसानों के लिए संपूर्ण समाधान। सरकारी योजनाओं से लेकर फसल की देखभाल तक सभी जानकारी एक ही स्थान पर।',
                'Complete agricultural solutions for farmers with modern technology. From government schemes to crop care - all information in one place.'
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/ai-assistant">
                <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 px-8 py-4 text-lg font-semibold shadow-lg">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {t('AI सहायक से बात करें', 'Talk to AI Assistant')}
                </Button>
              </Link>
              <Link to="/schemes">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-700 px-8 py-4 text-lg font-semibold">
                  {t('योजनाएं देखें', 'Explore Schemes')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('तुरंत सहायता पाएं', 'Get Instant Help')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('किसान भाइयों के लिए आवश्यक सेवाएं', 'Essential services for our farmer brothers')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <Link key={index} to={link.path} className="group">
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-green-300 group-hover:scale-105">
                  <CardHeader className="text-center pb-4">
                    <div className={`${link.color} p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <link.icon className="h-8 w-8 text-white mx-auto" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {link.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-gray-600 leading-relaxed">
                      {link.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('हमारी उपलब्धियां', 'Our Achievements')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-600 p-4 rounded-full w-16 h-16 mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-white mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('संपर्क में रहें', 'Stay Connected')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('किसी भी सहायता के लिए हमसे जुड़ें', 'Connect with us for any assistance')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Phone className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {t('फोन करें', 'Call Us')}
              </h3>
              <p className="text-gray-600">1800-123-4567</p>
            </div>
            <div className="text-center">
              <Mail className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {t('ईमेल भेजें', 'Email Us')}
              </h3>
              <p className="text-gray-600">help@krishisahyog.in</p>
            </div>
            <div className="text-center">
              <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {t('पता', 'Address')}
              </h3>
              <p className="text-gray-600">{t('नई दिल्ली, भारत', 'New Delhi, India')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;