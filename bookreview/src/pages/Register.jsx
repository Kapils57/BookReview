import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; 
import "../css/Register.css" 
function Register() {
    const {
        register,
        handleSubmit,
        setFocus,
        watch,
        formState: {errors, isSubmitting},
    }=useForm({mode: 'onSubmit'});
    const navigate = useNavigate();
    // localStorage.removeItem('token');
    
    const onSubmit =async (data) => {

        

        // console.log(data);
        // if (data.fullname.length < 3) {
      
        // setFocus("fullname"); 
        // return;
        // }

        const formData = new FormData();
        formData.append("fullname", data.fullname);
        formData.append("username", data.username);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("avatar", data.avatar[0]); // FileList -> File
        formData.append("coverImage", data.coverImage[0]);



        let response = await fetch("https://bookreview3-backend.onrender.com/api/users/register", {
            method:"POST",
            body: formData
        })
        const result = await response.json();
        if (response.ok) 
            {
                // alert(result.message); // "user registered successfully"
                // console.log("User created:", result.data);
                navigate("/login");
            } 
            else {
                // alert(result.message || "Something went wrong!");
                console.error("Error:", result);
            }
        // console.log(result);
  };
   
    
  
  return (
    <div className='register'>
        <form className='abc' onSubmit={handleSubmit(onSubmit)}>
            <div className='objects'>
                <label>Full Name: </label>
                <input
                    
                    type="text"
                    placeholder="Enter Full Name"
                    {...register('fullname', {
                        required: true,
                        minLength: { value: 3, message: 'Minlength at least 3' }
                    })}
                    className={errors.fullname ? 'input-error' : ''}
                    />
                </div>

            <div className='objects'>
                <label>User Name: </label>
                <input type="text" placeholder="Enter Username" {...register('username', {required:true})}/>
            </div>

            
            <div className='objects'>
                <label>Email: </label>
                <input type="Email" placeholder="Enter Email Address" {...register('email', {required:true})}/>
            </div>

            <div className='objects'>
                <label>Password: </label>
                <input type="Password" placeholder="Enter Password" {...register('password', {required:true})}/>
            </div>

            <div className='objects'>
                <label>Avatar: </label>
                <input type="file" accept="image/*" {...register('avatar', {required:true})}/>
            </div>

            <div className='objects'>
                <label>Cover Image: </label>
                <input type="file" accept="image/*" {...register('coverImage', {required:true})}/>
            </div>

            <div className='btn'>
                <input type="submit" disabled={isSubmitting} value={isSubmitting ? "Submitting" : "Submit"}/>
            </div>
        </form>
    </div>
  )
}

export default Register
