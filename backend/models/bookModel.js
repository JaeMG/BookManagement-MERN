import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishYear: {
        type: Number,
        required: true
    },
    summary: {
        type: String,
        required: false 
    },
    review: {
        type: String,
        required: false 
    }
}, 
{
    timestamps: true
});

export const Books = mongoose.model('Books', bookSchema);