from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
import uuid

class BilingualText(BaseModel):
    hindi: str
    english: str

class QAPair(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    question: BilingualText
    answer: BilingualText
    category: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class QAPairCreate(BaseModel):
    question: BilingualText
    answer: BilingualText
    category: str

class QAPairUpdate(BaseModel):
    question: Optional[BilingualText] = None
    answer: Optional[BilingualText] = None
    category: Optional[str] = None

class ChatRequest(BaseModel):
    question: str
    language: str = "hindi"

class ChatResponse(BaseModel):
    answer: str
    category: str