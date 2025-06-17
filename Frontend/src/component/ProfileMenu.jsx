
import {  useNavigate } from 'react-router-dom';

const ProfileMenu = (props) => {
    const mail = props.mail;
    const Navigate = useNavigate();


    const logout = async() => {
      console.log("logout called");
     
      // setLoading(true);
      const URL=import.meta.env.VITE_BACKEND_URL;
      try{
        const response = await fetch(`${URL}/logout`,{
          method:"DELETE",
          credentials:"include",
        });
        
        const resData = await response.json();
       
        if(response.status === 200){
          console.log(resData.message);
          // setLoading(false);
          Navigate("/")
          window.location.reload();
        }   
      }   
      catch(e){
        console.log(e);
      }    
    }
  
  return (
    <>
      <div>
          <ul className="profile-content">
              <li><div className="profile-menu-item">{mail}</div></li>
              <li onClick={logout}><div className="profile-menu-item">logout</div></li>
          </ul>
      </div>
    </>
  )
}

export default ProfileMenu
