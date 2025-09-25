from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
import uuid

class BilingualText(BaseModel):
    hindi: str
    english: str

class Crop(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    crop: BilingualText
    season: BilingualText
    soil_type: BilingualText
    sowing_time: BilingualText
    harvest_time: BilingualText
    tips: BilingualText
    region: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class CropCreate(BaseModel):
    crop: BilingualText
    season: BilingualText
    soil_type: BilingualText
    sowing_time: BilingualText
    harvest_time: BilingualText
    tips: BilingualText
    region: str

class CropUpdate(BaseModel):
    crop: Optional[BilingualText] = None
    season: Optional[BilingualText] = None
    soil_type: Optional[BilingualText] = None
    sowing_time: Optional[BilingualText] = None
    harvest_time: Optional[BilingualText] = None
    tips: Optional[BilingualText] = None
    region: Optional[str] = None