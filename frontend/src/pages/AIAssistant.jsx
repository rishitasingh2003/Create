import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useLanguage } from '../contexts/LanguageContext';
import { aiQuestionsAnswers } from '../data/mockData';
import { MessageCircle, Send, Bot, User, Search } from 'lucide-react';

const AIAssistant = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: t(
        'नमस्ते! मैं कृषि सहयोग का AI सहायक हूं। मैं आपकी खेती और सरकारी योजनाओं के बारे में मदद कर सकता हूं।',
        'Hello! I am KrishiSahyog AI Assistant. I can help you with farming and government schemes.'
      )
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: t('सभी', 'All') },
    { value: 'Crop Cultivation', label: t('फसल उत्पादन', 'Crop Cultivation') },
    { value: 'Government Schemes', label: t('सरकारी योजनाएं', 'Government Schemes') },
    { value: 'Pest Management', label: t('कीट प्रबंधन', 'Pest Management') }
  ];

  const quickQuestions = aiQuestionsAnswers.filter(qa => 
    selectedCategory === 'all' || qa.category === selectedCategory
  ).slice(0, 6);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = { type: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);

    // Find matching answer
    const matchingQA = aiQuestionsAnswers.find(qa => 
      qa.question.hindi.toLowerCase().includes(inputMessage.toLowerCase()) ||
      qa.question.english.toLowerCase().includes(inputMessage.toLowerCase()) ||
      inputMessage.toLowerCase().includes(qa.question.hindi.toLowerCase()) ||
      inputMessage.toLowerCase().includes(qa.question.english.toLowerCase())
    );

    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        content: matchingQA 
          ? t(matchingQA.answer.hindi, matchingQA.answer.english)
          : t(
              'मुझे खुशी होगी आपकी मदद करने में। कृपया अपना प्रश्न और स्पष्ट तरीके से पूछें।',
              'I would be happy to help you. Please ask your question more clearly.'
            )
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputMessage('');
  };

  const handleQuickQuestion = (question) => {
    const userMessage = { 
      type: 'user', 
      content: t(question.question.hindi, question.question.english) 
    };
    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        content: t(question.answer.hindi, question.answer.english)
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-green-600 p-4 rounded-full w-20 h-20 mx-auto mb-6">
            <MessageCircle className="h-12 w-12 text-white mx-auto" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('AI सहायक', 'AI Assistant')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t(
              'खेती और सरकारी योजनाओं के बारे में तुरंत जवाब पाएं',
              'Get instant answers about farming and government schemes'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Questions */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Search className="h-5 w-5 mr-2" />
                  {t('त्वरित प्रश्न', 'Quick Questions')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Category Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    {t('श्रेणी चुनें', 'Select Category')}
                  </label>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quick Question Buttons */}
                <div className="space-y-2">
                  {quickQuestions.map((qa) => (
                    <Button
                      key={qa.id}
                      variant="outline"
                      className="w-full text-left justify-start h-auto p-3 hover:bg-green-50 hover:border-green-300"
                      onClick={() => handleQuickQuestion(qa)}
                    >
                      <span className="text-sm leading-relaxed">
                        {t(qa.question.hindi, qa.question.english)}
                      </span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              {/* Chat Messages */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-3 ${
                      message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      message.type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-green-600 text-white'
                    }`}>
                      {message.type === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                    </div>
                    <div className={`flex-1 max-w-md ${
                      message.type === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      <div className={`inline-block p-4 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-6 border-t bg-white">
                <div className="flex space-x-3">
                  <Input
                    type="text"
                    placeholder={t('अपना प्रश्न यहां लिखें...', 'Type your question here...')}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 text-lg py-3"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-green-600 hover:bg-green-700 px-6"
                    disabled={!inputMessage.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {t(
                    'यह एक सामान्य FAQ सिस्टम है। अधिक जानकारी के लिए कृषि विशेषज्ञ से संपर्क करें।',
                    'This is a basic FAQ system. Contact agricultural experts for detailed information.'
                  )}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;