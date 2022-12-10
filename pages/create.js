import Router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm } from '../components/hooks/useForm'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2'
import style from '../styles/create.module.css';


const Create = () => {
    const router = useRouter();

    const idu = new Date().getTime()
    const [formValues, handleInputChnage, reset] = useForm({
        id: idu,
        fullName: '',
        age: '',
        occupation: '',
        nickName: '',
        gender: '',
        picture: ''

    })

    const {  id, fullName, age, occupation, nickName, gender, picture } = formValues

    const handleSubmit = async (e) => {
        e.preventDefault()
        reset()
      
        if ( fullName === '' || age === '' || occupation === '' || nickName === '' || gender=== '' || picture === '' ) {
         
            Swal.fire({
                title: 'Error!',
                text: 'full all fields please! ',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
    
      
               
        }else {
            const body =  {...formValues}  
            await fetch( 'http://localhost:3001/people' , {
                method: "POST",
                body: JSON.stringify(body),
                headers: { "Content-type": "application/json" },

            })
    
              
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'success',
    title: 'Profile edited successfully!'
  })

  router.push('/')     
        }
    }


 
  return (
   <div className={ style.containerF} >
    <button className="btn btn-success w-30 m-4"
    onClick={ ()=>  router.push('/')   }
    >Back</button>
             <div className={ style.formContainer } >
            <h2 className="p-4 text-white text-center" >Create new user</h2>
        <form onSubmit={ handleSubmit} >
            <div className="form-group m-2">
            
                <input type="text" disabled="disabled" defaultValue={ id  } 
                name="id"
                className="form-control"
                />
            </div>

            <div className="form-group m-2">
                <input type="text" placeholder="fullName" 
                 className="form-control"
               defaultValue={ fullName }
                name="fullName"
                onChange={ handleInputChnage }
                />
            </div>

            <div className="form-group m-2">
                <input type="text" placeholder="age" 
                 className="form-control"
                defaultValue={ age }
                name="age"
                onChange={ handleInputChnage }
                />
            </div>

            <div className="form-group m-2">
                <input type="text" placeholder="occupation"
                 className="form-control" 
                name='occupation'
               defaultValue={ occupation }
                onChange={ handleInputChnage }
                />
            </div>

            <div className="form-group m-2">
                <input type="text" placeholder="nicknane"
                 className="form-control"
                name='nickName' 
               defaultValue={ nickName }
                onChange={ handleInputChnage }
                />
            </div>

            <div className="form-group m-2">
                <input type="text" placeholder="gender" 
                 className="form-control"
               defaultValue={ gender }
                name="gender"
                onChange={ handleInputChnage }
                />
            </div>

            <div className="form-group m-2">
                <input type="url" placeholder="picture" 
                 className="form-control"
                defaultValue={ picture }
                name="picture"
                onChange={ handleInputChnage }
                />
            </div>

            <button type="submit" className='btn btn-success mt-4 btn-lg w-100' onSubmit={ handleSubmit } >Send</button>
        </form>

    </div>
   </div>
  )
}

export default Create