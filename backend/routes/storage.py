from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List
from models.storage import StorageGuide, StorageGuideCreate, StorageGuideUpdate
from datetime import datetime

router = APIRouter()

# MongoDB connection
from server import db

@router.get("/storage", response_model=List[StorageGuide])
async def get_storage_guides(item: Optional[str] = Query(None)):
    """Get all storage guides with optional item filtering"""
    try:
        filter_query = {}
        
        if item:
            filter_query["$or"] = [
                {"item.hindi": {"$regex": item, "$options": "i"}},
                {"item.english": {"$regex": item, "$options": "i"}}
            ]
        
        storage_guides = await db.storage_guides.find(filter_query).to_list(1000)
        return [StorageGuide(**guide) for guide in storage_guides]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/storage/{guide_id}", response_model=StorageGuide)
async def get_storage_guide(guide_id: str):
    """Get a single storage guide by ID"""
    try:
        guide = await db.storage_guides.find_one({"id": guide_id})
        if guide is None:
            raise HTTPException(status_code=404, detail="Storage guide not found")
        return StorageGuide(**guide)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/storage", response_model=StorageGuide)
async def create_storage_guide(guide_data: StorageGuideCreate):
    """Create a new storage guide"""
    try:
        storage_guide = StorageGuide(**guide_data.dict())
        await db.storage_guides.insert_one(storage_guide.dict())
        return storage_guide
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/storage/{guide_id}", response_model=StorageGuide)
async def update_storage_guide(guide_id: str, guide_data: StorageGuideUpdate):
    """Update an existing storage guide"""
    try:
        update_data = guide_data.dict(exclude_unset=True)
        update_data["updated_at"] = datetime.utcnow()
        
        result = await db.storage_guides.update_one(
            {"id": guide_id}, 
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Storage guide not found")
            
        updated_guide = await db.storage_guides.find_one({"id": guide_id})
        return StorageGuide(**updated_guide)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/storage/{guide_id}")
async def delete_storage_guide(guide_id: str):
    """Delete a storage guide"""
    try:
        result = await db.storage_guides.delete_one({"id": guide_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Storage guide not found")
        return {"message": "Storage guide deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))