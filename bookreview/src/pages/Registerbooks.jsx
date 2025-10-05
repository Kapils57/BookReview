import React from 'react'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import "../css/Registerbooks.css" 

function Registerbooks() {
    
    const location = useLocation();
    const existingBook = location.state?.book;
    const showEdit = location.state?.showEdit;

    const {
        register,
        handleSubmit,
        setFocus,
        setValue,
        watch,
        formState: {errors, isSubmitting},
    }=useForm({mode: 'onSubmit'});

    const navigate = useNavigate();

    useEffect(() => {
        if (existingBook) {
            setValue('title', existingBook.title);
            setValue('author', existingBook.author);
            setValue('description', existingBook.description);
            setValue('genre', existingBook.genre);
            setValue('published_year', existingBook.published_year);
            // coverImage cannot be pre-filled (file input), optional: show preview
        }
    }, [existingBook, setValue]);



    const onSubmit =async (data) => {

        


        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("author", data.author);
        formData.append("description", data.description);
        formData.append("genre", data.genre);
        formData.append("published_year", data.published_year);
        
        if (data.coverImage) {
            formData.append("coverImage", data.coverImage[0]);
        }
        

        const token = localStorage.getItem("token");
        let url = "http://localhost:5000/api/books/registerbooks";
        let method = "POST";

        if (existingBook) {
            // Editing an existing book
            url = `http://localhost:5000/api/books/updatemybooks/${existingBook._id}`;
            method = "PUT";
        }



        let response = await fetch(url, {
            method:method,
            headers: {
                Authorization: `Bearer ${token}`  // 👈 token from login
            },
            body: formData
        })
        const result = await response.json();
        if (response.ok) 
            {
                // alert("Submited successfully")
                // alert(result.message); // "user registered successfully"
                console.log(existingBook ? "Book Updated:" : "Book Registered:", result.data);
                navigate("/mybooks");
                // navigate("/login");          **
            } 
            else {
                    // alert("Submited successfully")
                alert(result.message || "Something went wrong!");     
                console.error("Error:", result);                      
            }
        // console.log(result);
  };
   
    
  
  return (
    <div className='register'>
        <form className='abc' onSubmit={handleSubmit(onSubmit)}>
            <div className='objects'>
                <label>Title: </label>
                <input
                    
                    type="text"
                    placeholder="Enter Title"
                    {...register('title', {
                        required: true,
                        minLength: { value: 5, message: 'Minlength at least 5' }
                    })}
                    className={errors.fullname ? 'input-error' : ''}
                    />
                </div>

            <div className='objects'>
                <label>Author Name: </label>
                <input type="text" placeholder="Enter Author" {...register('author', {required:true})}/>
            </div>

            
            <div className='objects'>
                <label>Description: </label>
                <textarea className='gh' placeholder="Enter Description" {...register('description', {required:true})}
                rows={4}
                style={{ width: '100%' }}></textarea>
            </div>

            <div className='objects'>
                <label>Genre: </label>
                <input type="text" placeholder="Enter Genre" {...register('genre', {required:true})}/>
            </div>

            <div className='objects'>
                <label>Published Year: </label>
                <input type="number" placeholder="Enter Published Year" {...register('published_year', {required:true})}/>
            </div>

            

            {!showEdit && (
                <div className='objects'>
                    <label>Cover Image:</label>
                    <input type="file" accept="image/*" {...register('coverImage', { required: true })} />
                </div>
            )}

           

            <div className='btn'>
                <input type="submit" disabled={isSubmitting} value={isSubmitting ? "Submitting" : "Submit"}/>
            </div>
        </form>
    </div>
  )
}

export default Registerbooks