
const Profile = (props) => {
    const user = props.user[0].split(" ")[0];
    // console.log(user," from Profile")
    const logo = props.user[1];
    // console.log(logo,"from profil")
    
  return (
    <>
      <div className='profile-section'>
        <img className='profile-logo' src={logo || "profileLogo.png"} />
        <label className='profile-name'>{user}</label>
      </div>
    </>
  )
}

export default Profile