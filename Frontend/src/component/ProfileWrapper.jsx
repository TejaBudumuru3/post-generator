import React from 'react'
import Profile from './Profile.jsx'
import ProfileMenu from './ProfileMenu.jsx';

const ProfileWrapper = (props) => {
    const {email,fname} = props.user;
    const [showMenu, setShowMenu] = React.useState(false);
  return (
    <>
        <div className='ProfileWrapper' onClick={() => setShowMenu(!showMenu)}>
            <Profile user={fname}/>
            { showMenu && 
            <ProfileMenu mail={email}/>
            }
        </div>
    </>
  )
}

export default ProfileWrapper