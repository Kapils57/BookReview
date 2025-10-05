    import React, { useState } from 'react';
    import { useForm } from 'react-hook-form';
    import { useNavigate, useLocation } from 'react-router-dom';
    import "../css/registerbooks.css"
    function AddReview() {


    const location = useLocation();
    const book = location.state?.book;
    
    const {
            register,
            handleSubmit,
            setFocus,
            watch,
            formState: {errors, isSubmitting},
        }=useForm({mode: 'onSubmit'});
        const navigate = useNavigate();

        const onSubmit =async (data) => {

            


            

        
            

            const token = localStorage.getItem("token");

            let response = await fetch(`https://bookreview3-backend.onrender.com/api/books/review/${book._id}`, {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`  // 👈 token from login
                },
                body: JSON.stringify({
                    rating: Number(data.rating),
                    reviewText: data.reviewText
                })    
            })

            const result = await response.json();
            if (response.ok) 
                {
                    console.log("Review Added:", result.data);   
                    navigate("/");
                
                } 
                else {
                       
                    alert(result.message || "Something went wrong!");     
                    console.error("Error:", result);                      
                }
            
    };


    return (
        <div className='register'>
            <form className='abc' onSubmit={handleSubmit(onSubmit)}>
            
    
                <div className='objects'>
                    <label>Rating (1-5):</label>
                    <input type="number" placeholder="Enter Ratings" {...register('rating', {required:true})}/>
                </div>

                <div className='objects'>
                    <label>Review: </label>
                    <textarea className="gh" placeholder="Enter Review" {...register('reviewText', {required:true})}
                    rows={4}
                    style={{ width: '100%', resize: 'vertical' }}></textarea>
                </div>
                

                <div className='btn'>
                    <input type="submit" disabled={isSubmitting} value={isSubmitting ? "Submitting" : "Submit"}/>
                </div>
            </form>
        </div>
      
    );
}

export default AddReview;
