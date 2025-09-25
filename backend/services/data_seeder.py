"""
Data seeder to populate the database with initial mock data
This replaces the mock data from the frontend
"""

from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, date
import os
import asyncio

# Mock data converted from frontend
INITIAL_SCHEMES = [
    {
        "id": "scheme_1",
        "name": {
            "hindi": "प्रधानमंत्री किसान सम्मान निधि",
            "english": "PM Kisan Samman Nidhi"
        },
        "description": {
            "hindi": "छोटे और सीमांत किसानों को वित्तीय सहायता के लिए ₹6,000 प्रति वर्ष",
            "english": "Financial assistance of ₹6,000 per year for small and marginal farmers"
        },
        "eligibility": {
            "hindi": "सभी भूमिधारक किसान परिवार",
            "english": "All landholding farmer families"
        },
        "state": "Central",
        "category": "Financial Support",
        "link": "https://pmkisan.gov.in",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": "scheme_2",
        "name": {
            "hindi": "फसल बीमा योजना",
            "english": "Pradhan Mantri Fasal Bima Yojana"
        },
        "description": {
            "hindi": "प्राकृतिक आपदाओं से होने वाले नुकसान के लिए फसल बीमा",
            "english": "Crop insurance for losses due to natural disasters"
        },
        "eligibility": {
            "hindi": "सभी किसान (भूमिधारक और गैर-भूमिधारक)",
            "english": "All farmers (landholding and non-landholding)"
        },
        "state": "Central",
        "category": "Insurance",
        "link": "https://pmfby.gov.in",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": "scheme_3",
        "name": {
            "hindi": "कृषि यंत्रीकरण योजना",
            "english": "Sub Mission on Agricultural Mechanization"
        },
        "description": {
            "hindi": "कृषि उपकरण खरीदने के लिए सब्सिडी",
            "english": "Subsidy for purchasing agricultural equipment"
        },
        "eligibility": {
            "hindi": "सभी श्रेणी के किसान",
            "english": "Farmers of all categories"
        },
        "state": "Central",
        "category": "Equipment",
        "link": "https://agrimachinery.nic.in",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
]

INITIAL_CROPS = [
    {
        "id": "crop_1",
        "crop": {
            "hindi": "गेहूं",
            "english": "Wheat"
        },
        "season": {
            "hindi": "रबी",
            "english": "Rabi"
        },
        "soil_type": {
            "hindi": "दोमट मिट्टी",
            "english": "Loamy Soil"
        },
        "sowing_time": {
            "hindi": "नवंबर-दिसंबर",
            "english": "November-December"
        },
        "harvest_time": {
            "hindi": "मार्च-अप्रैल",
            "english": "March-April"
        },
        "tips": {
            "hindi": "उचित जल निकासी और नियमित सिंचाई आवश्यक",
            "english": "Proper drainage and regular irrigation required"
        },
        "region": "All India",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": "crop_2",
        "crop": {
            "hindi": "धान",
            "english": "Rice"
        },
        "season": {
            "hindi": "खरीफ",
            "english": "Kharif"
        },
        "soil_type": {
            "hindi": "चिकनी मिट्टी",
            "english": "Clay Soil"
        },
        "sowing_time": {
            "hindi": "जून-जुलाई",
            "english": "June-July"
        },
        "harvest_time": {
            "hindi": "अक्टूबर-नवंबर",
            "english": "October-November"
        },
        "tips": {
            "hindi": "पानी से भरे खेत में उगाई जाती है",
            "english": "Grown in flooded fields"
        },
        "region": "All India",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
]

INITIAL_MARKET_DATA = [
    {
        "id": "market_1",
        "commodity": {
            "hindi": "गेहूं",
            "english": "Wheat"
        },
        "market": "Delhi Mandi",
        "price": 2150.0,
        "unit": "per quintal",
        "change": "+50",
        "date": "2024-01-15",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": "market_2",
        "commodity": {
            "hindi": "धान",
            "english": "Rice"
        },
        "market": "Mumbai Mandi",
        "price": 3200.0,
        "unit": "per quintal",
        "change": "-25",
        "date": "2024-01-15",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": "market_3",
        "commodity": {
            "hindi": "मक्का",
            "english": "Maize"
        },
        "market": "Pune Mandi",
        "price": 1850.0,
        "unit": "per quintal",
        "change": "+75",
        "date": "2024-01-15",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
]

INITIAL_QA_PAIRS = [
    {
        "id": "qa_1",
        "question": {
            "hindi": "गेहूं की खेती कैसे करें?",
            "english": "How to cultivate wheat?"
        },
        "answer": {
            "hindi": "गेहूं की खेती के लिए दोमट मिट्टी सबसे उपयुक्त है। नवंबर-दिसंबर में बुआई करें। नियमित सिंचाई और उर्वरक का प्रयोग करें।",
            "english": "Loamy soil is most suitable for wheat cultivation. Sow in November-December. Use regular irrigation and fertilizers."
        },
        "category": "Crop Cultivation",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": "qa_2",
        "question": {
            "hindi": "PM किसान योजना के लिए कैसे आवेदन करें?",
            "english": "How to apply for PM Kisan scheme?"
        },
        "answer": {
            "hindi": "PM किसान की आधिकारिक वेबसाइट पर जाकर ऑनलाइन आवेदन कर सकते हैं। आधार कार्ड, बैंक खाता और भूमि का विवरण चाहिए।",
            "english": "You can apply online on the official PM Kisan website. Aadhaar card, bank account and land details are required."
        },
        "category": "Government Schemes",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": "qa_3",
        "question": {
            "hindi": "फसल में कीट लगने पर क्या करें?",
            "english": "What to do when crops are affected by pests?"
        },
        "answer": {
            "hindi": "तुरंत कृषि विशेषज्ञ से संपर्क करें। जैविक कीटनाशक का प्रयोग करें। नीम का तेल प्राकृतिक कीटनाशक है।",
            "english": "Contact agricultural expert immediately. Use organic pesticides. Neem oil is a natural pesticide."
        },
        "category": "Pest Management",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
]

INITIAL_STORAGE_GUIDES = [
    {
        "id": "storage_1",
        "item": {
            "hindi": "अनाज",
            "english": "Grains"
        },
        "tips": [
            {
                "hindi": "अनाज को पूरी तरह सुखाकर भंडारित करें",
                "english": "Store grains after complete drying"
            },
            {
                "hindi": "हवादार स्थान पर रखें",
                "english": "Keep in well-ventilated area"
            }
        ],
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": "storage_2",
        "item": {
            "hindi": "सब्जियां",
            "english": "Vegetables"
        },
        "tips": [
            {
                "hindi": "ठंडी और सूखी जगह पर रखें",
                "english": "Store in cool and dry place"
            },
            {
                "hindi": "अलग-अलग सब्जियों को अलग रखें",
                "english": "Store different vegetables separately"
            }
        ],
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
]

async def seed_database():
    """Seed the database with initial data"""
    try:
        # MongoDB connection
        mongo_url = os.environ['MONGO_URL']
        client = AsyncIOMotorClient(mongo_url)
        db = client[os.environ['DB_NAME']]
        
        # Clear existing data (optional - remove in production)
        await db.schemes.delete_many({})
        await db.crops.delete_many({})
        await db.market_prices.delete_many({})
        await db.qa_pairs.delete_many({})
        await db.storage_guides.delete_many({})
        
        # Insert initial data
        await db.schemes.insert_many(INITIAL_SCHEMES)
        await db.crops.insert_many(INITIAL_CROPS)
        await db.market_prices.insert_many(INITIAL_MARKET_DATA)
        await db.qa_pairs.insert_many(INITIAL_QA_PAIRS)
        await db.storage_guides.insert_many(INITIAL_STORAGE_GUIDES)
        
        print("✅ Database seeded successfully!")
        print(f"- {len(INITIAL_SCHEMES)} schemes inserted")
        print(f"- {len(INITIAL_CROPS)} crops inserted")
        print(f"- {len(INITIAL_MARKET_DATA)} market prices inserted")
        print(f"- {len(INITIAL_QA_PAIRS)} Q&A pairs inserted")
        print(f"- {len(INITIAL_STORAGE_GUIDES)} storage guides inserted")
        
        client.close()
        
    except Exception as e:
        print(f"❌ Error seeding database: {str(e)}")

if __name__ == "__main__":
    asyncio.run(seed_database())