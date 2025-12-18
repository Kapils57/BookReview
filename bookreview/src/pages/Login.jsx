import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; 
import "../css/Login.css" 
function Login({setIsLoggedIn}) {
    const {
        register,
        handleSubmit,
        formState: {isSubmitting},
    }=useForm({mode: 'onSubmit'});
    const navigate = useNavigate();
    // localStorage.removeItem('token');
    const onSubmit =async (data) => {
        let response = await fetch("http://localhost:5000/api/users/login", {
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: data.email,
              password: data.password
            })
        })
        const result = await response.json();
        if (response.ok) 
            {
                localStorage.setItem("token", result.data.Accesstoken);
                localStorage.setItem("refreshToken", result.data.Refreshtoken);
                // alert(result.message); // "user registered successfully"
                // console.log("User created:", result.data);
                setIsLoggedIn(true);
                navigate("/");
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
                <label>Email: </label>
                <input type="Email" placeholder="Enter Email Address" {...register('email', {required:true})}/>
            </div>

            <div className='objects'>
                <label>Password: </label>
                <input type="Password" placeholder="Enter Password" {...register('password', {required:true})}/>
            </div>

            

            <div className='btn'>
                <input type="submit" disabled={isSubmitting} value={isSubmitting ? "Submitting" : "Submit"}/>
            </div>
        </form>
    </div>
  )
}

export default Login 
