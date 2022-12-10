import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'


const Taks = ({task}) => {

   const [ completed , setCompletd ] = useState(false)
   const [title, setTitle] = useState("")
   const [description, setDescription] = useState("")
   const [ startDate, setStartDate] = useState("")
   const [endDate, setEndDate] = useState("")
 
   const router = useRouter();
   const { id } = router.query;


   const handdleSubmit = async (e) => {
    e.preventDefault()

     const data = { title, description, startDate, endDate ,  completed }

    try {
        
          
            await fetch(`http://localhost:3001/tasks/${id}`, {
                method: 'PUT',
                headers:{"content-type":"application/json"},
                body:JSON.stringify(data)
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
  title: 'Task changed successfully'
})

    router.push('/')
    } catch (error) {
        console.log(error);
    }
}


useEffect(()=> {
    setCompletd( task.completed )
    setEndDate( task.endDate )
    setTitle( task.title )
    setDescription( task.description )
    setStartDate( task.startDate)
},[])





return (
 
<div className="container">

<table className="table table-dark table-striped">
  <thead>
    <tr>
      <th scope="col">title</th>
      <th scope="col">description</th>
      <th scope="col">completed</th>
      <th scope="col">startDate</th>
      <th scope="col">endDate</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>{ task.title }</th>
      <td>{ task.description } </td>
          <td> 
            <label > Task { completed === false ? 'Incomplete' :'Completed'  }  </label> 
               
          </td>
      <td> { task.startDate } </td>
      <td> { task.endDate } </td>
    </tr>
  </tbody>
</table>




      <div className="modal-edit">
      <form  onSubmit={ handdleSubmit } >
    <input hidden="hidden" type="text" className='form-control' value={ task.title } 
    placeholder="title"
    onChange= { e=> setTitle(e.target.value) }
    />
       <input hidden="hidden" className='form-control' type="text" value={ task.description } 
     onChange= { e=> setDescription(e.target.value) }
    />

    <input hidden="hidden" className='form-control' type="text" value={ task.startDate } 
     onChange= { e=> setStartDate(e.target.value) }
    />

      <input hidden="hidden" className='form-control' type="text" value={ task.endDate } 
     onChange= { e=> setEndDate(e.target.value) }
    />        

    
      <div className="form-check">
        <label style={{color:"white"}} >Change done or not your task</label>
        <input type="checkbox" 
        onChange={e=> setCompletd(e.target.checked)}
        className="form-check-input"
        value={ completed }  />
      </div>

      <button type="submit" className="btn btn-success mt-4" >Save changes</button>
  </form>
      </div>
  

</div>
  )
}

export default Taks