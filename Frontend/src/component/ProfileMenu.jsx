
import React from 'react'
import Message from './Message';
import {  useNavigate } from 'react-router-dom';

const ProfileMenu = (props) => {
    const mail = props.mail;
    const Navigate = useNavigate();

    const [loading, setLoading] = React.useState(false);

    const logout = async() => {
      console.log("logout called");
      setLoading(true);
      const URL="http://localhost:3000/user/logout";
      try{
        const response = await fetch(URL,{
          method:"DELETE",
          credentials:"include",
        });

        const resData = await response.json();
        if(response.status === 200){
          Navigate("/");
          console.log(resData.message);
          setLoading(false);
          //window.location.reload();
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
      {loading && <Message />}
    </>
  )
}

export default ProfileMenu
