from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List
from datetime import date, datetime
from models.market import MarketPrice, MarketPriceCreate, MarketPriceUpdate

router = APIRouter()

# MongoDB connection
from database import db

@router.get("/market", response_model=List[MarketPrice])
async def get_market_prices(
    commodity: Optional[str] = Query(None),
    market: Optional[str] = Query(None),
    date_filter: Optional[date] = Query(None, alias="date")
):
    """Get all market prices with optional filtering"""
    try:
        filter_query = {}
        
        if commodity:
            filter_query["$or"] = [
                {"commodity.hindi": {"$regex": commodity, "$options": "i"}},
                {"commodity.english": {"$regex": commodity, "$options": "i"}}
            ]
            
        if market:
            filter_query["market"] = {"$regex": market, "$options": "i"}
            
        if date_filter:
            filter_query["date"] = date_filter
        
        # Sort by date descending to get latest prices first
        market_data = await db.market_prices.find(filter_query).sort("date", -1).to_list(1000)
        return [MarketPrice(**price) for price in market_data]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/market/{price_id}", response_model=MarketPrice)
async def get_market_price(price_id: str):
    """Get a single market price by ID"""
    try:
        price = await db.market_prices.find_one({"id": price_id})
        if price is None:
            raise HTTPException(status_code=404, detail="Market price not found")
        return MarketPrice(**price)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/market", response_model=MarketPrice)
async def create_market_price(price_data: MarketPriceCreate):
    """Create a new market price entry"""
    try:
        market_price = MarketPrice(**price_data.dict())
        await db.market_prices.insert_one(market_price.dict())
        return market_price
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/market/{price_id}", response_model=MarketPrice)
async def update_market_price(price_id: str, price_data: MarketPriceUpdate):
    """Update an existing market price"""
    try:
        update_data = price_data.dict(exclude_unset=True)
        update_data["updated_at"] = datetime.utcnow()
        
        result = await db.market_prices.update_one(
            {"id": price_id}, 
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Market price not found")
            
        updated_price = await db.market_prices.find_one({"id": price_id})
        return MarketPrice(**updated_price)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/market/{price_id}")
async def delete_market_price(price_id: str):
    """Delete a market price entry"""
    try:
        result = await db.market_prices.delete_one({"id": price_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Market price not found")
        return {"message": "Market price deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))