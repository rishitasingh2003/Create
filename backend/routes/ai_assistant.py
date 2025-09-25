from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List
from models.qa_pairs import QAPair, QAPairCreate, QAPairUpdate, ChatRequest, ChatResponse
from datetime import datetime

router = APIRouter()

# MongoDB connection
from server import db

@router.get("/ai/questions", response_model=List[QAPair])
async def get_qa_pairs(category: Optional[str] = Query(None)):
    """Get all Q&A pairs with optional category filtering"""
    try:
        filter_query = {}
        
        if category and category != "all":
            filter_query["category"] = category
        
        qa_pairs = await db.qa_pairs.find(filter_query).to_list(1000)
        return [QAPair(**qa) for qa in qa_pairs]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ai/chat", response_model=ChatResponse)
async def chat_with_ai(chat_request: ChatRequest):
    """Simple chat functionality using predefined Q&A pairs"""
    try:
        question = chat_request.question.lower()
        language = chat_request.language
        
        # Search for matching Q&A pairs
        matching_qa = await db.qa_pairs.find({
            "$or": [
                {"question.hindi": {"$regex": question, "$options": "i"}},
                {"question.english": {"$regex": question, "$options": "i"}}
            ]
        }).to_list(100)
        
        if matching_qa:
            # Return the best match (first one for now)
            qa = QAPair(**matching_qa[0])
            answer = qa.answer.hindi if language == "hindi" else qa.answer.english
            return ChatResponse(answer=answer, category=qa.category)
        else:
            # Default response if no match found
            default_answer = (
                "मुझे खुशी होगी आपकी मदद करने में। कृपया अपना प्रश्न और स्पष्ट तरीके से पूछें।" 
                if language == "hindi" 
                else "I would be happy to help you. Please ask your question more clearly."
            )
            return ChatResponse(answer=default_answer, category="General")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/ai/questions/{qa_id}", response_model=QAPair)
async def get_qa_pair(qa_id: str):
    """Get a single Q&A pair by ID"""
    try:
        qa = await db.qa_pairs.find_one({"id": qa_id})
        if qa is None:
            raise HTTPException(status_code=404, detail="Q&A pair not found")
        return QAPair(**qa)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ai/questions", response_model=QAPair)
async def create_qa_pair(qa_data: QAPairCreate):
    """Create a new Q&A pair"""
    try:
        qa_pair = QAPair(**qa_data.dict())
        await db.qa_pairs.insert_one(qa_pair.dict())
        return qa_pair
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/ai/questions/{qa_id}", response_model=QAPair)
async def update_qa_pair(qa_id: str, qa_data: QAPairUpdate):
    """Update an existing Q&A pair"""
    try:
        update_data = qa_data.dict(exclude_unset=True)
        update_data["updated_at"] = datetime.utcnow()
        
        result = await db.qa_pairs.update_one(
            {"id": qa_id}, 
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Q&A pair not found")
            
        updated_qa = await db.qa_pairs.find_one({"id": qa_id})
        return QAPair(**updated_qa)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/ai/questions/{qa_id}")
async def delete_qa_pair(qa_id: str):
    """Delete a Q&A pair"""
    try:
        result = await db.qa_pairs.delete_one({"id": qa_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Q&A pair not found")
        return {"message": "Q&A pair deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))