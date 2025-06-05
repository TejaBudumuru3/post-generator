import React from 'react'

const profile = (props) => {
    const user = props.user ? props.user : "Guest";
  return (
    <>
    <div>
      <img className='profile-logo' src="profileLogo.png" />
      <label className='profile-name'>{user}</label>
    </div>
    </>

  )
}

export default profile