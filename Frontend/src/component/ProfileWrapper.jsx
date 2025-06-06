import React from 'react'
import Profile from './Profile.jsx'
import ProfileMenu from './ProfileMenu.jsx';

const ProfileWrapper = (props) => {
    const {name, email} = props;
    const [showMenu, setShowMenu] = React.useState(false);
  return (
    <>
        <div className='ProfileWrapper' onClick={() => setShowMenu(!showMenu)}>
            <Profile user={name}/>
            { showMenu && 
            <ProfileMenu mail={email}/>
            }
        </div>
    </>
  )
}

export default ProfileWrapper