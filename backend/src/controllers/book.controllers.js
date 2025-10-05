import dotenv from "dotenv"
import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import {Book} from '../models/books.model.js'
import UploadonCloudinary from '../utils/cloudinary.js';
dotenv.config({path:'./.env'})



export const registerBook = asyncHandler( async (req, res, next)=>{

    
        console.log("req.body:", req.body);




        const {title, author, description, genre, published_year} = req.body;


        if (!title || !author || !description || !genre || !published_year) {
                throw new ApiError(400, "All fields are required");
        }

        if(
            [title, author, description, genre].some((field) => field?.trim()==="")
        ){
            throw new ApiError(400, "All fields are required")
        }
        

        const existedBook = await Book.findOne(
            {title}
        )

        if(existedBook){
            throw new ApiError(409, "Book already existed")
        }

        const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
        // const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

        if(!coverImageLocalPath){
            throw new ApiError(400, "coverImage is required");
        }
        const coverImage = await UploadonCloudinary(coverImageLocalPath);


        


        if(!coverImage ){
            throw new ApiError(400, "Avatar is required");
        }

        const book = await Book.create({
            title,
            author,
            description,
            genre,
            published_year,
            coverImage : coverImage.url,
            owner: req.user._id
        
            
        })

        const createdBook = await Book.findById(book._id)
        if(!createdBook){
            throw new ApiError(500, "something went wrong while registering the user")
        }

        return res.status(201).json(
            new ApiResponse(201, createdBook, "Book registered successfully")
        )

})

export const getBooks = asyncHandler( async (req, res, next)=>{

    
    try {
        const books = await Book.find(); 
        return res.status(200).json(
            new ApiResponse(200, books, "Books fetched successfully"));
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
      

})
export const getmyBooks = asyncHandler( async (req, res, next)=>{
    const ownerId = req.user._id;
    
    try {
        const books = await Book.find({owner : ownerId});  // 📌 Extract all data from collection
        return res.status(200).json(
            new ApiResponse(200, books, "User's Books fetched successfully"));
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
      

})

export const updateBooks = asyncHandler( async (req, res, next)=>{
    const bookId = req.params.id; 
    const ownerId = req.user._id;
    
    const book = await Book.findById(bookId);
    if (!book) {
         throw new ApiError(404, "Book not found")
    }
    if (book.owner.toString() !== ownerId.toString()) {
        // return res.status(403).json(new ApiResponse(403, null, "You are not allowed to edit this book"));
        throw new ApiError(404, "You are not allowed to edit this book")
    }

    const { title, author, description, genre, published_year } = req.body;
    if (title) book.title = title;
    if (author) book.author = author;
    if (description) book.description = description;
    if (genre) book.genre = genre;
    if (published_year) book.published_year = published_year;







    
    const updatedBook = await book.save();
    return res.status(200).json(new ApiResponse(200, updatedBook, "Book updated successfully"));


})


export const addReview = asyncHandler(async (req, res) => {
    const bookId = req.params.id;
    const { rating, reviewText } = req.body;
    const userId = req.user._id;

    if (!rating || rating < 1 || rating > 5) {
        throw new ApiError(400, "Rating must be between 1 and 5");
    }

    if (!reviewText) {
        throw new ApiError(400, "Review text is required");
    }

    const book = await Book.findById(bookId);
    if (!book) throw new ApiError(404, "Book not found");


    const review = {
        user: userId,
        rating: Number(rating),
        reviewText,
        createdAt: new Date()
    };

    book.reviews.push(review);
    await book.save();
    return res.status(200).json(new ApiResponse(200, review, "Review added successfully"));
    
});

