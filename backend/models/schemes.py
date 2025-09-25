from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
import uuid

class BilingualText(BaseModel):
    hindi: str
    english: str

class Scheme(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: BilingualText
    description: BilingualText
    eligibility: BilingualText
    state: str
    category: str
    link: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class SchemeCreate(BaseModel):
    name: BilingualText
    description: BilingualText
    eligibility: BilingualText
    state: str
    category: str
    link: str

class SchemeUpdate(BaseModel):
    name: Optional[BilingualText] = None
    description: Optional[BilingualText] = None
    eligibility: Optional[BilingualText] = None
    state: Optional[str] = None
    category: Optional[str] = None
    link: Optional[str] = None