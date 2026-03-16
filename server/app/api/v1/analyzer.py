from google import genai
from google.genai import types
from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from typing import List
from pydantic import BaseModel
import os
import json
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=API_KEY) if API_KEY else None

router = APIRouter()

class DisposalGuide(BaseModel):
    bin_color: str
    description: str

class AnalysisResult(BaseModel):
    item_type: str
    recommendations: List[str]
    disposal_guide: DisposalGuide
    reword_points: int = 0

@router.post("/analyze", response_model=AnalysisResult)
async def analyze_ewaste(
    weight_kg: float = Form(...),
    image: UploadFile = File(...)
):
    """
    Analyzes an upload of e-waste utilizing Computer Vision (Gemini 2.5-flash).
    """
    if not API_KEY or not client:
        raise HTTPException(status_code=500, detail="Gemini API Key missing in backend .env")

    try:
        image_bytes = await image.read()

        prompt = f"""
        You are an expert AI E-waste recycling assistant.
        Analyze this electronic component.
        Estimated Weight: {weight_kg} kg.

        Tasks:
        1. Identify exactly what type of e-waste this is.
        2. Provide recommendations (e.g., resale value tips, safety warnings).
        3. If useless, what color dustbin to throw it in (recommend Blue for Tech/Circuitry, Red for Hazardous/Batteries, Yellow for Cable/Covers, Green for General).
        4. Give reword points for each recommendation as {weight_kg} and type of e-waste.

        Return a JSON-only response matching this exact schema:
        {{
          "item_type": "string",
          "recommendations": ["string"],
          "disposal_guide": {{
            "bin_color": "string",
            "description": "string"
          }},
          "reword_points": number
        }}
        """

        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=[
                types.Part.from_bytes(
                    data=image_bytes,
                    mime_type=image.content_type
                ),
                prompt
            ],
            config=types.GenerateContentConfig(
                response_mime_type="application/json"
            )
        )

        print(f"--- Gemini Response Text ---")
        print(response.text)
        print("----------------------------")

        parsed = json.loads(response.text)
        
        # Fallback Defaults for Pydantic safety
        if "item_type" not in parsed:
            parsed["item_type"] = "Unidentified electronic component"
        if "recommendations" not in parsed:
            parsed["recommendations"] = ["Process safely under standard recycling protocols."]
        if "disposal_guide" not in parsed or not isinstance(parsed["disposal_guide"], dict):
            parsed["disposal_guide"] = {
                "bin_color": "Yellow",
                "description": "General E-waste Sorting Facility Bin."
            }
        else:
             guide = parsed["disposal_guide"]
             if "bin_color" not in guide:
                 guide["bin_color"] = "Yellow"
             if "description" not in guide:
                 guide["description"] = "General sorting required."

        if "reword_points" not in parsed:
            parsed["reword_points"] = 0

        return AnalysisResult(**parsed)

    except Exception as e:
        import traceback
        try:
            with open("logs_500.txt", "a") as f:
                f.write("\n--- EXCEPTION IN /analyze ---\n")
                traceback.print_exc(file=f)
                f.write("-----------------------------\n")
        except:
             pass
        raise HTTPException(status_code=500, detail=f"AI Analysis Failed: {str(e)}")
