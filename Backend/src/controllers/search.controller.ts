import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";
import { Request, Response } from "express";
import { AIResponse } from "../gemini";
import axios from 'axios'




export const searchTrip = asyncHandler(async(req: Request, res: Response) => {
    const { placeName } = req.body;

    if(!placeName || placeName.trim() == '') throw new ApiError(400, "PlaceName is required")

    const response  = await AIResponse(placeName)
    

    const placesArray = extractPlacesFromLLM(response!)
    console.log(placesArray)



    const placesWithCoords = await Promise.all(
  placesArray.map(async (place: any) => {
    const coords = await getCoordinates(place.name, placeName);

    return {
      ...place,
      // @ts-ignore
      lat: coords?.lat,
      // @ts-ignore
      lng: coords?.lng,
    };
  })
);



    return res.status(200).json(new ApiResponse(200, placesWithCoords, "Places to visit fetched successfully."))

})



function extractPlacesFromLLM(rawString: string) {
  // Remove ```json, ``` and any newlines/spaces around
  const cleaned = rawString
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  // Parse JSON safely
  const parsed = JSON.parse(cleaned);

  // Return array of places
  return parsed.places;
}



export async function getCoordinates(placeName: string, cityName = "") {
  async function getCoordinates(place: string) {
  const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(place)}&format=json`);
  
  const data = await res.json();
  console.log("Response data",data)
  return { lat: data[0].lat, lon: data[0].lon };
 
}
}
    
