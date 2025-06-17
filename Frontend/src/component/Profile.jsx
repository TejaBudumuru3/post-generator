
const Profile = (props) => {
    const user = props.user;
    
  return (
    <>
      <div className='profile-section'>
        <img className='profile-logo' src="profileLogo.png" />
        <label className='profile-name'>{user}</label>
      </div>
    </>
  )
}

export default Profile