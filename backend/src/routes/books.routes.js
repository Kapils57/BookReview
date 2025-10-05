import  Router  from "express";
import verifyjwt from "../middlewares/auth.middlewares.js"
import {registerBook} from "../controllers/book.controllers.js";
import upload from "../middlewares/multer.middleware.js"
import { getBooks } from "../controllers/book.controllers.js";
import { getmyBooks } from "../controllers/book.controllers.js";
import {updateBooks} from "../controllers/book.controllers.js";
import { addReview } from "../controllers/book.controllers.js";
const bookRouter = Router();

bookRouter.post(
  '/registerbooks',
   upload.fields([
    
    {
        name:"coverImage",              //same name should be given to the field accepting the image
        maxCount:1
        
    }]),
  verifyjwt,
     
  registerBook
);
bookRouter.get(
  '/getbooks', getBooks
);
bookRouter.get(
  '/getmybooks', verifyjwt, getmyBooks
);
bookRouter.put(
  '/updatemybooks/:id',  verifyjwt, upload.fields([
    {
        name:"coverImage",              //same name should be given to the field accepting the image
        maxCount:1
        
    }]), updateBooks
);
bookRouter.post(
  '/review/:id', verifyjwt, addReview 
);
export default bookRouter