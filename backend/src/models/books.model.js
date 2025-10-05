import mongoose from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';       


const reviewSchema = new mongoose.Schema({

    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true },

    rating: { 
        type: Number, 
        required: true, 
        min: 1, 
        max: 5 },

    reviewText: { 
        type: String, 
        required: true },
    
}, {timestamps:true});


const bookSchema = new mongoose.Schema({
    
    title : {
        type : String,              
        required:true,
        trim : true,
        

    },
    author : {
        type : String,              
        required:true,
        trim : true,
        

    },
    description : {
        type : String,            
        required:true,
        

    },
    genre : {
        type : String,            
        required:true,
        trim : true,
        

    },
    published_year : {
        type : Number,            
        required:true,
        
    },
    coverImage : {                          /* used to storing urls only  */
        type : String,              /* we r going to use "cloudinary url service" */
        required : true,
        
        
    },
    
    
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true,
    },

    reviews: [reviewSchema]

},{timestamps:true});

bookSchema.plugin(mongooseAggregatePaginate)

export const Book = mongoose.model('Book', bookSchema);