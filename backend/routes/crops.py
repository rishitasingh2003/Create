from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List
from models.crops import Crop, CropCreate, CropUpdate
from datetime import datetime

router = APIRouter()

# MongoDB connection
from server import db

@router.get("/crops", response_model=List[Crop])
async def get_crops(
    season: Optional[str] = Query(None),
    soil_type: Optional[str] = Query(None),
    region: Optional[str] = Query(None)
):
    """Get all crops with optional filtering"""
    try:
        filter_query = {}
        
        if season and season != "all":
            filter_query["$or"] = [
                {"season.hindi": {"$regex": season, "$options": "i"}},
                {"season.english": {"$regex": season, "$options": "i"}}
            ]
            
        if soil_type:
            filter_query["$or"] = filter_query.get("$or", []) + [
                {"soil_type.hindi": {"$regex": soil_type, "$options": "i"}},
                {"soil_type.english": {"$regex": soil_type, "$options": "i"}}
            ]
            
        if region:
            filter_query["region"] = {"$regex": region, "$options": "i"}
        
        crops = await db.crops.find(filter_query).to_list(1000)
        return [Crop(**crop) for crop in crops]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/crops/{crop_id}", response_model=Crop)
async def get_crop(crop_id: str):
    """Get a single crop by ID"""
    try:
        crop = await db.crops.find_one({"id": crop_id})
        if crop is None:
            raise HTTPException(status_code=404, detail="Crop not found")
        return Crop(**crop)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/crops", response_model=Crop)
async def create_crop(crop_data: CropCreate):
    """Create a new crop"""
    try:
        crop = Crop(**crop_data.dict())
        await db.crops.insert_one(crop.dict())
        return crop
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/crops/{crop_id}", response_model=Crop)
async def update_crop(crop_id: str, crop_data: CropUpdate):
    """Update an existing crop"""
    try:
        update_data = crop_data.dict(exclude_unset=True)
        update_data["updated_at"] = datetime.utcnow()
        
        result = await db.crops.update_one(
            {"id": crop_id}, 
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Crop not found")
            
        updated_crop = await db.crops.find_one({"id": crop_id})
        return Crop(**updated_crop)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/crops/{crop_id}")
async def delete_crop(crop_id: str):
    """Delete a crop"""
    try:
        result = await db.crops.delete_one({"id": crop_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Crop not found")
        return {"message": "Crop deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))