import React from 'react'

const ProfileMenu = (props) => {
    const mail = props.mail;

    const logout = async() => {
      console.log("logout called");

      const URL="http://localhost:3000/user/logout";
      try{
        const response = await fetch(URL,{
          method:"DELETE",
          credentials:"include",
        });

        const resData = await response.json();
        if(response.status === 200){
          console.log(resData.message);
          window.location.reload();
        }
      }
      catch(e){
        console.log(e);
      }
    }
  
  return (
    <div>
        <ul className="profile-content">
            <li><label>{mail}</label></li>
            <li><p>edit</p></li>
            <li onClick={logout}><p>logout</p></li>
        </ul>
    </div>
  )
}

export default ProfileMenu