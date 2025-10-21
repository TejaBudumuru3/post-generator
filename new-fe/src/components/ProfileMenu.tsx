import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';

const ProfileMenu = (props:any) => {
    const mail = props.mail;
    const Navigate = useNavigate();
    const [visible, setVisible] = useState(true)


    
    const logout = async() => {
     
      // setLoading(true);
      const URL=import.meta.env.VITE_BACKEND_URL;
      try{
        const response = await fetch(`${URL}/logout`,{
          method:"DELETE",
          credentials:"include",
        });
        
       
        if(response.status === 200){
          // window.location.reload() 
          await cookieStore.delete("token");         
          Navigate("/")
        }   
      }   
      catch(e){
        console.log(e);
      }    
    }
  
  return (
    <>
      <div>
        <style>{`
          .profile-menu-item{
            padding: 2px 5px;
            margin:3px;
            border-radius: 2px;
            cursor: pointer;
            background:black;
          }
             .profile-menu-item:hover{
              background:#1d1d1d
            }
            `}
        </style>
          <ul className={` ${visible ? "absolute" : "hidden"}  right-1 mt-2 z-1000 rounded p-3 bg-[#101010]`}
          onMouseEnter={()=>{setVisible(true)}}
          onMouseLeave={()=>{setVisible(false)}}>
              <li><div className="profile-menu-item">{mail}</div></li>
              {/* <li onClick={()=>Navigate("/verify-email")}><div className="profile-menu-item">verify email</div></li> */}
              <li onClick={logout}><div className="profile-menu-item">logout</div></li>
          </ul>
      </div>
    </>
  )
}

export default ProfileMenu
