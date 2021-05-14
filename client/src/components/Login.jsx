import './login.css';
import { Room, Cancel} from "@material-ui/icons";
import {useRef,useState} from 'react';
import axios from 'axios';

export default function Login({setShowLogin, myStorage,setCurrentUser}){
     
    const [error,setError]=useState(false);
    const nameRef= useRef();
    
    const passwordRef= useRef();

    const handleSubmit= async (e)=>{
        e.preventDefault();
        const user={
            username:nameRef.current.value,
            
            password:passwordRef.current.value,
        }
        try {
            const res = await axios.post("https://pinmaptravel.herokuapp.com/api/users/login",user)
            myStorage.setItem("user",res.data.username)
            setCurrentUser(res.data.username)
            setShowLogin(false)
            setError(false)
            {<h1>Welcome`${res.data.username}`</h1>}
            
            
        } catch (error) {
            
           setError(true)
        }

    }


    return(
        <div className="loginContainer">
            <div className="logo">
                <Room/>
                Sammy's Pin Map
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" ref={nameRef}></input>
                
                <input type="password" placeholder="password" ref={passwordRef}></input>
                <button className="loginBtn">login</button>
                {error &&
                <span className="failure"> Failed. Retry</span>}
            </form>
            <Cancel className="loginCancel" onClick={()=>setShowLogin(false)}/>

        </div>
    )
}