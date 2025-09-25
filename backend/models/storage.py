from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
import uuid

class BilingualText(BaseModel):
    hindi: str
    english: str

class StorageGuide(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    item: BilingualText
    tips: List[BilingualText]
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class StorageGuideCreate(BaseModel):
    item: BilingualText
    tips: List[BilingualText]

class StorageGuideUpdate(BaseModel):
    item: Optional[BilingualText] = None
    tips: Optional[List[BilingualText]] = None