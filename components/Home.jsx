import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
import React from 'react'
import { useState, useEffect } from 'react'



const Home = ({ users, tasks }) => {

  const [chnage, setChnage] = useState(false)
  const [condition, setCondition] = useState([])
  // const [condition2, setCondition2] = useState('')



const taskId = tasks.map( task => task.personId )


const changeOrder = () => {
  if ( chnage === false ) {
    setChnage(true)
    setCondition(users.sort((first, second)=> first.age < second.age ? 1 : -1 ))
  }else {
    setChnage(false)
    setCondition(users.sort((first, second)=> first.age > second.age ? 1 : -1 ))
  }

}

useEffect(()=> {
  setCondition(users.sort((first, second)=> first.age > second.age ? 1 : -1 ))
}, [users])

// console.log( condition );


  return (
   <div >
      <h2 className="text-center p-4" >Welcome to my app</h2>
      <div className="container bg-dark" >

     <div className="d-flex justify-content-space-between">
     <button className="btn btn-success w-50 m-4" onClick={ changeOrder } > Show users by mayor age </button>
     <button  className="btn btn-success w-50 m-4 color-white" >
        <Link  legacyBehavior href="/create" >
            <li style={{color:"white", listStyle:"none"}} > Create user </li>
        </Link>
     </button>
     </div>

        <div className="row">
          { 

            chnage === false ? 
                condition.map(user => (
                  <div className="col-md-4 p-4" key={ user.id } >
                  <div className="card" style={{width: "18rem"}} >
                   <img className="card-img-top" src={ user.picture} alt={ user.fullName } />
                   <div className="card-body">
                     <h5 className="card-title"> { user.fullName } </h5>
                     <p className="card-text"> <strong>Age :</strong>  {user.age } </p>
                     <p className="card-text"> <strong>Ocupation: </strong> { user.occupation } </p>
                     <button 
                     className="btn btn-success"
                     onClick={ ()=> Router.push('/people/[id]', `people/${user.id}`, taskId) }
                     >Details</button>
                   </div>
                 </div>
                 </div>
                )) :
             
                condition.map(user => (
                  <div className="col-md-4 p-4" key={ user.id } >
                  <div className="card" style={{width: "18rem"}} >
                   <img className="card-img-top" src={ user.picture} alt={ user.fullName } />
                   <div className="card-body">
                     <h5 className="card-title"> { user.fullName } </h5>
                     <p className="card-text"> <strong>Age :</strong>  {user.age } </p>
                     <p className="card-text"> <strong>Ocupation: </strong> { user.occupation } </p>
                     <button 
                     className="btn btn-success"
                     onClick={ ()=> Router.push('/people/[id]', `people/${user.id}`, taskId) }
                     >Details</button>
                   </div>
                 </div>
                </div>
                ))
          }
        </div>
    </div>
   </div>
  )
}

export default Home