from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List
from motor.motor_asyncio import AsyncIOMotorClient
import os
from models.schemes import Scheme, SchemeCreate, SchemeUpdate
from datetime import datetime

router = APIRouter()

# MongoDB connection
from database import db

@router.get("/schemes", response_model=List[Scheme])
async def get_schemes(
    category: Optional[str] = Query(None),
    state: Optional[str] = Query(None),
    search: Optional[str] = Query(None)
):
    """Get all schemes with optional filtering"""
    try:
        filter_query = {}
        
        if category and category != "all":
            filter_query["category"] = category
            
        if state and state != "all":
            filter_query["state"] = state
            
        if search:
            filter_query["$or"] = [
                {"name.hindi": {"$regex": search, "$options": "i"}},
                {"name.english": {"$regex": search, "$options": "i"}},
                {"description.hindi": {"$regex": search, "$options": "i"}},
                {"description.english": {"$regex": search, "$options": "i"}}
            ]
        
        schemes = await db.schemes.find(filter_query).to_list(1000)
        return [Scheme(**scheme) for scheme in schemes]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/schemes/{scheme_id}", response_model=Scheme)
async def get_scheme(scheme_id: str):
    """Get a single scheme by ID"""
    try:
        scheme = await db.schemes.find_one({"id": scheme_id})
        if scheme is None:
            raise HTTPException(status_code=404, detail="Scheme not found")
        return Scheme(**scheme)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/schemes", response_model=Scheme)
async def create_scheme(scheme_data: SchemeCreate):
    """Create a new scheme"""
    try:
        scheme = Scheme(**scheme_data.dict())
        await db.schemes.insert_one(scheme.dict())
        return scheme
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/schemes/{scheme_id}", response_model=Scheme)
async def update_scheme(scheme_id: str, scheme_data: SchemeUpdate):
    """Update an existing scheme"""
    try:
        update_data = scheme_data.dict(exclude_unset=True)
        update_data["updated_at"] = datetime.utcnow()
        
        result = await db.schemes.update_one(
            {"id": scheme_id}, 
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Scheme not found")
            
        updated_scheme = await db.schemes.find_one({"id": scheme_id})
        return Scheme(**updated_scheme)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/schemes/{scheme_id}")
async def delete_scheme(scheme_id: str):
    """Delete a scheme"""
    try:
        result = await db.schemes.delete_one({"id": scheme_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Scheme not found")
        return {"message": "Scheme deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))