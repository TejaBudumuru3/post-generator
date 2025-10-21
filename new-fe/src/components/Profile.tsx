
const Profile = (props:any) => {
    const user = props.user[0].split(" ")[0];
    // console.log(user," from Profile")
    const logo = props.user[1];
    // console.log(logo,"from profil")
    
  return (
    <>
      <div className='text-center justify-items-center'>
        <img className='size-10 rounded-full' src={logo || "profileLogo.png"} />
        <label className='text-center curosr-pointer'>{user}</label>
      </div>
    </>
  )
}

export default Profile