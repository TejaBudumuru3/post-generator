import React from 'react'
import Message from './Message';

const ProfileMenu = (props) => {
    const mail = props.mail;

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
          console.log(resData.message);
          setLoading(false);
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
              <li><label>{mail}</label></li>
              <li><p>edit</p></li>
              <li onClick={logout}><p>logout</p></li>
          </ul>
      </div>
      {loading && <Message />}
    </>
  )
}

export default ProfileMenu