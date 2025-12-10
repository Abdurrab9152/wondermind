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
      lat: coords.lat,
      lng: coords.lng,
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
  try {
    // Combine place + city for better accuracy
    const query = `${placeName} ${cityName}`.trim();

    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
      query
    )}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

   
    const response = await axios.get(url);
     console.log(response)

    // If Google can't find the place
    if (!response.data.results || response.data.results.length === 0) {
      console.warn(`⚠ No coordinates found for: ${placeName}`);
      return { lat: null, lng: null };
    }

    const { lat, lng } = response.data.results[0].geometry.location;

    return { lat, lng };
  } catch (error) {
    // @ts-ignore
    console.error("❌ Error fetching coordinates:", error.message);
    return { lat: null, lng: null };
  }
}