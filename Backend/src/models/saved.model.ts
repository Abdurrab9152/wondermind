import mongoose, { Schema } from "mongoose";



export interface Savedtrips {
    userId: mongoose.Types.ObjectId;
    name : string;
    description : string;
    latitude : number;
    longitude : number;
}




const savedTripSchema = new Schema<Savedtrips>({
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    name : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true
    },
    latitude : {
        type : Number,
        required : true
    },
    longitude : Number
}, {
    timestamps : true
})



export const SavedTrips = mongoose.models.SavedTrips || mongoose.model<Savedtrips>("Saved",savedTripSchema)