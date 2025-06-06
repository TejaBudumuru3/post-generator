import React from 'react'

const ProfileMenu = (props) => {
    const mail = props.mail;
  return (
    <div>
        <ul className="profile-content">
            <li><label>{mail}</label></li>
            <li><p>edit</p></li>
            <li><p>logout</p></li>
        </ul>
    </div>
  )
}

export default ProfileMenu