import { useDispatch } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import {setUser } from '../slices/userSlice';

const ProfileMenu = (props) => {
    const mail = props.mail;
    const Navigate = useNavigate();
    const dispatch = useDispatch();


    const logout = async() => {
     
      // setLoading(true);
      const URL=import.meta.env.VITE_BACKEND_URL;
      try{
        const response = await fetch(`${URL}/logout`,{
          method:"DELETE",
          credentials:"include",
        });
        
       
        if(response.status === 200){
          dispatch(setUser(null));
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
          <ul className="profile-content">
              <li><div className="profile-menu-item">{mail}</div></li>
              <li onClick={logout}><div className="profile-menu-item">logout</div></li>
          </ul>
      </div>
    </>
  )
}

export default ProfileMenu
