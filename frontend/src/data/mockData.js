// Mock data for KrishiSahyog website

export const governmentSchemes = [
  {
    id: 1,
    name: {
      hindi: 'प्रधानमंत्री किसान सम्मान निधि',
      english: 'PM Kisan Samman Nidhi'
    },
    description: {
      hindi: 'छोटे और सीमांत किसानों को वित्तीय सहायता के लिए ₹6,000 प्रति वर्ष',
      english: 'Financial assistance of ₹6,000 per year for small and marginal farmers'
    },
    eligibility: {
      hindi: 'सभी भूमिधारक किसान परिवार',
      english: 'All landholding farmer families'
    },
    state: 'Central',
    category: 'Financial Support',
    link: 'https://pmkisan.gov.in'
  },
  {
    id: 2,
    name: {
      hindi: 'फसल बीमा योजना',
      english: 'Pradhan Mantri Fasal Bima Yojana'
    },
    description: {
      hindi: 'प्राकृतिक आपदाओं से होने वाले नुकसान के लिए फसल बीमा',
      english: 'Crop insurance for losses due to natural disasters'
    },
    eligibility: {
      hindi: 'सभी किसान (भूमिधारक और गैर-भूमिधारक)',
      english: 'All farmers (landholding and non-landholding)'
    },
    state: 'Central',
    category: 'Insurance',
    link: 'https://pmfby.gov.in'
  },
  {
    id: 3,
    name: {
      hindi: 'कृषि यंत्रीकरण योजना',
      english: 'Sub Mission on Agricultural Mechanization'
    },
    description: {
      hindi: 'कृषि उपकरण खरीदने के लिए सब्सिडी',
      english: 'Subsidy for purchasing agricultural equipment'
    },
    eligibility: {
      hindi: 'सभी श्रेणी के किसान',
      english: 'Farmers of all categories'
    },
    state: 'Central',
    category: 'Equipment',
    link: 'https://agrimachinery.nic.in'
  }
];

export const cropGuidanceData = [
  {
    id: 1,
    crop: {
      hindi: 'गेहूं',
      english: 'Wheat'
    },
    season: {
      hindi: 'रबी',
      english: 'Rabi'
    },
    soilType: {
      hindi: 'दोमट मिट्टी',
      english: 'Loamy Soil'
    },
    sowingTime: {
      hindi: 'नवंबर-दिसंबर',
      english: 'November-December'
    },
    harvestTime: {
      hindi: 'मार्च-अप्रैल',
      english: 'March-April'
    },
    tips: {
      hindi: 'उचित जल निकासी और नियमित सिंचाई आवश्यक',
      english: 'Proper drainage and regular irrigation required'
    }
  },
  {
    id: 2,
    crop: {
      hindi: 'धान',
      english: 'Rice'
    },
    season: {
      hindi: 'खरीफ',
      english: 'Kharif'
    },
    soilType: {
      hindi: 'चिकनी मिट्टी',
      english: 'Clay Soil'
    },
    sowingTime: {
      hindi: 'जून-जुलाई',
      english: 'June-July'
    },
    harvestTime: {
      hindi: 'अक्टूबर-नवंबर',
      english: 'October-November'
    },
    tips: {
      hindi: 'पानी से भरे खेत में उगाई जाती है',
      english: 'Grown in flooded fields'
    }
  }
];

export const weatherData = {
  current: {
    location: 'Delhi',
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    condition: 'Partly Cloudy',
    conditionHindi: 'आंशिक बादल'
  },
  forecast: [
    { day: 'Today', dayHindi: 'आज', high: 30, low: 22, condition: 'Sunny', conditionHindi: 'धूप' },
    { day: 'Tomorrow', dayHindi: 'कल', high: 28, low: 20, condition: 'Cloudy', conditionHindi: 'बादल' },
    { day: 'Day 3', dayHindi: 'तीसरा दिन', high: 25, low: 18, condition: 'Rain', conditionHindi: 'बारिश' },
    { day: 'Day 4', dayHindi: 'चौथा दिन', high: 27, low: 19, condition: 'Partly Cloudy', conditionHindi: 'आंशिक बादल' },
    { day: 'Day 5', dayHindi: 'पांचवा दिन', high: 29, low: 21, condition: 'Sunny', conditionHindi: 'धूप' },
    { day: 'Day 6', dayHindi: 'छठा दिन', high: 31, low: 23, condition: 'Hot', conditionHindi: 'गर्म' },
    { day: 'Day 7', dayHindi: 'सातवां दिन', high: 26, low: 20, condition: 'Rain', conditionHindi: 'बारिश' }
  ]
};

export const marketData = [
  {
    id: 1,
    commodity: {
      hindi: 'गेहूं',
      english: 'Wheat'
    },
    market: 'Delhi Mandi',
    price: 2150,
    unit: 'per quintal',
    change: '+50',
    date: '2024-01-15'
  },
  {
    id: 2,
    commodity: {
      hindi: 'धान',
      english: 'Rice'
    },
    market: 'Mumbai Mandi',
    price: 3200,
    unit: 'per quintal',
    change: '-25',
    date: '2024-01-15'
  },
  {
    id: 3,
    commodity: {
      hindi: 'मक्का',
      english: 'Maize'
    },
    market: 'Pune Mandi',
    price: 1850,
    unit: 'per quintal',
    change: '+75',
    date: '2024-01-15'
  }
];

export const aiQuestionsAnswers = [
  {
    id: 1,
    question: {
      hindi: 'गेहूं की खेती कैसे करें?',
      english: 'How to cultivate wheat?'
    },
    answer: {
      hindi: 'गेहूं की खेती के लिए दोमट मिट्टी सबसे उपयुक्त है। नवंबर-दिसंबर में बुआई करें। नियमित सिंचाई और उर्वरक का प्रयोग करें।',
      english: 'Loamy soil is most suitable for wheat cultivation. Sow in November-December. Use regular irrigation and fertilizers.'
    },
    category: 'Crop Cultivation'
  },
  {
    id: 2,
    question: {
      hindi: 'PM किसान योजना के लिए कैसे आवेदन करें?',
      english: 'How to apply for PM Kisan scheme?'
    },
    answer: {
      hindi: 'PM किसान की आधिकारिक वेबसाइट पर जाकर ऑनलाइन आवेदन कर सकते हैं। आधार कार्ड, बैंक खाता और भूमि का विवरण चाहिए।',
      english: 'You can apply online on the official PM Kisan website. Aadhaar card, bank account and land details are required.'
    },
    category: 'Government Schemes'
  },
  {
    id: 3,
    question: {
      hindi: 'फसल में कीट लगने पर क्या करें?',
      english: 'What to do when crops are affected by pests?'
    },
    answer: {
      hindi: 'तुरंत कृषि विशेषज्ञ से संपर्क करें। जैविक कीटनाशक का प्रयोग करें। नीम का तेल प्राकृतिक कीटनाशक है।',
      english: 'Contact agricultural expert immediately. Use organic pesticides. Neem oil is a natural pesticide.'
    },
    category: 'Pest Management'
  }
];

export const storageGuidance = [
  {
    id: 1,
    item: {
      hindi: 'अनाज',
      english: 'Grains'
    },
    tips: [
      {
        hindi: 'अनाज को पूरी तरह सुखाकर भंडारित करें',
        english: 'Store grains after complete drying'
      },
      {
        hindi: 'हवादार स्थान पर रखें',
        english: 'Keep in well-ventilated area'
      }
    ]
  },
  {
    id: 2,
    item: {
      hindi: 'सब्जियां',
      english: 'Vegetables'
    },
    tips: [
      {
        hindi: 'ठंडी और सूखी जगह पर रखें',
        english: 'Store in cool and dry place'
      },
      {
        hindi: 'अलग-अलग सब्जियों को अलग रखें',
        english: 'Store different vegetables separately'
      }
    ]
  }
];