import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { Request, Response } from "express";
import { SavedTrips } from "../models/saved.model";



export const saveTrip = asyncHandler(async(req: Request, res : Response) => {
    const { 
        name,
        description,
        latitude,
        longitude
    } = req.body


    if(!name || !description || !latitude || !longitude){
        throw new ApiError(400, "All fields are required")
    }

    const saveTrip = await SavedTrips.create({
        userId : req.user?._id,
        name,
        description,
        latitude,
        longitude
    })

    if(!saveTrip) {
        throw new ApiError(500, "Unable to save trip into database")
    }

    return res.status(200).json(new ApiResponse(200, true, "Trip saved successfully."))

})



export const removeTrip = asyncHandler(async(req: Request, res: Response) => {
    const {
        tripId
    } = req.params

    

    const isTripExist = await SavedTrips.findOne({
        userId : req.user?._id,
        _id : tripId
    })

    if(!isTripExist) throw new ApiError(404, "Trip is not saved")



    return res.status(200).json(new ApiResponse(200, {}, "Trip removed successfully."))


})


