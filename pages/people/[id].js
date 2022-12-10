import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useState,useEffect } from "react";
import Taks from "../../components/Taks";
import style from '../../styles/profile.module.css'
import Swal from 'sweetalert2'

const UserProfile = ({ user, task }) => {

    // console.log(task);

    const [fullName, setName] = useState("")
    const [nicKname , setNickName] = useState("")
    const [occupation, setOccupati] = useState("")
    const [gender, setGen] = useState("")
    const [picture, setPict] = useState("")
    const [age, setAgee] = useState("")
    const [open, setOpen] = useState(false)


  
    const router = useRouter();
    const { id } = router.query;
    // console.log(id);
    // console.log( user );


    useEffect(()=> {
        setName( user.fullName )
        setNickName( user.nicKname)
        setOccupati( user.occupation )
        setGen( user.gender )
        setPict( user.picture )
        setAgee(user.age)
        //  setNewId(user.id)
    },[])


    

    const handdleSubmit = async (e) => {
        e.preventDefault()

         const data = { id,  fullName ,age,occupation, nicKname , gender, picture  }

        try {
           await fetch(`http://localhost:3001/people/${id}`, {
                method: 'PUT',
                headers:{"content-type":"application/json"},
                body:JSON.stringify(data)
            } )
        } catch (error) {
            console.log(error);
        }

        
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

    return (
        <div className={ style.profile} >
        <div className="container py-4 m-4">
        <div className="row">
                <div className="col-md-8">
                <Taks task={task} />
                </div>
                <div className="col-md-4">
                <div className={style.containerProfile} >
             <div className="row" >
            <div className="col-md-12">
            <div className="card" style={ {width: "20rem;"} }>
             <img className="card-img-top " src={ user.picture } alt="image"/>
            <div className="card-body">
                <h4 className="card-title"> <strong>Name: </strong> { user.fullName } </h4>
                <h4 className="card-text"> <strong>Nickname : </strong> { user.nicKname } </h4>
                <h4 className="card-text"> <strong>Occupation : </strong> { user.occupation } </h4>
                 <h4 className="card-text"> <strong>Gender : </strong> { user.gender } </h4>

                 <h6 className="card-text"> <strong>Id : </strong> { user.id} </h6>
               
             <div className="container_buttons d-flex p-2 justify-content-between">
             <button className="btn btn-success" >
               <Link className="text-white" style={{textDecoration:"none"}} legacyBehavior href="/">
                    <li style={{listStyle:"none"}} >Back</li>
               </Link>
               </button>

               <button
            className="btn btn-success"
            onClick={ () => setOpen(!open) }
            >Edit Profile</button>
             </div>

            </div>
            </div>
            </div>
        </div>
       </div>
        </div>
    </div>
        </div>
          
       
        { 
            open === true ? ( <div className={ style.background} 
           
            >
                <div className={ style.close}  onClick={ e => setOpen(false) } >
                    <p>Close</p>
                </div>
            <div className={ style.containerForm }  >
                <h3 className="text-center text-white" >Edit profile</h3>
            <form onSubmit={ handdleSubmit } >
            <div className="form-group">
                    <label>Id</label>
                    <input disabled="disabled" type="text" defaultValue={ id } 
                    className="form-control" 
                  
                    />
                </div>
        
                <div className="form-group">
                    <label>fullName</label>
                    <input type="text" defaultValue={ fullName } 
                    className="form-control" 
                    onChange={ e => setName(e.target.value) }
                    />
                </div>
        
                <div className="form-group">
                    <label> Nickname </label>
                    <input type="text" defaultValue={ nicKname } 
                    className="form-control" 
                    onChange={ e => setNickName(e.target.value) }
                    />
                </div>
        
                <div className="form-group">
                    <label>Occupation</label>
                    <input type="text" 
                   defaultValue={ occupation }
                     className="form-control" 
                     onChange={ e => setOccupati(e.target.value) }
                     />
                </div>
        
                <div className="form-group">
                    <label>Gender</label>
                    <input type="text" defaultValue={ gender }
                     onChange={ e => setGen(e.target.value) }
                    className="form-control"  />
                </div>
        
                <div className="form-group">
                    <label>Picture</label>
                    <input type="url" defaultValue={ picture }
                     onChange={ e => setPict(e.target.value) }
                    className="form-control"  />
                </div>
        
                <div className="form-group">
                    <label>Age</label>
                    <input type="text" defaultValue={ age }
                     onChange={ e => setAgee(e.target.value) }
                    className="form-control"  />
                </div>
        
                    <button type="submit" className="btn btn-warning btn-lg w-100 mt-2" >Save</button>
            </form>
            </div>
            </div>
           
    ) : ('')
        }
        
    </div>
    )
}


UserProfile.getInitialProps = async (ctx) => {
    console.log(ctx);
     console.log( ctx.query.id );
    const response = await fetch(`http://localhost:3001/people/${ctx.query.id}`)
    const apiTask = await fetch(`http://localhost:3001/tasks/${ctx.query.id}`)
    const responseTask = await apiTask.json()
    const resJson = await response.json();
    return { user: resJson, task: responseTask }

 }


export default UserProfile