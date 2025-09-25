from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime, date
import uuid

class BilingualText(BaseModel):
    hindi: str
    english: str

class MarketPrice(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    commodity: BilingualText
    market: str
    price: float
    unit: str
    change: str
    date: date
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class MarketPriceCreate(BaseModel):
    commodity: BilingualText
    market: str
    price: float
    unit: str
    change: str
    date: date

class MarketPriceUpdate(BaseModel):
    commodity: Optional[BilingualText] = None
    market: Optional[str] = None
    price: Optional[float] = None
    unit: Optional[str] = None
    change: Optional[str] = None
    date: Optional[date] = None