from fastapi import APIRouter, Depends
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.llm_service import llm_service

router = APIRouter()

@router.post("/completions", response_model=ChatResponse)
async def create_chat_completion(request: ChatRequest):
    """
    Enterprise Chat Completion Endpoint with RAG Support.
    """
    response = await llm_service.generate_response(request.message, request.session_id)
    return {"message": response}
