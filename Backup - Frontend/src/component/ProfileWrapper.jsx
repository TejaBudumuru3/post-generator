import React from 'react'
import Profile from './Profile.jsx'
import ProfileMenu from './ProfileMenu.jsx';

const ProfileWrapper = (props) => {
    const {email,name,picture} = props.user;
    const [showMenu, setShowMenu] = React.useState(false);
  return (
    <>
        <div className='ProfileWrapper' onClick={() => setShowMenu(!showMenu)}>
            <Profile user={[name, picture]}/>
            { showMenu && 
            <ProfileMenu mail={email}/>
            }
        </div>
    </>
  )
}

export default ProfileWrapper