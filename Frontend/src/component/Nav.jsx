import Profile from "./Profile.jsx";
import ProfileWrapper from "./ProfileWrapper.jsx";
import Signup from "./Signup.jsx";

const NavBar = ({userData,setUserData})=>{
    console.log("Userdata",userData.data)
    return(
        <>
        <nav className="Navbar" style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px", backgroundColor: "#6D28D9"}}>
            <div className="title">
                <h1 className="title-text">Post Generator</h1>
            </div>
            <div className="user">
                {userData && userData.name  ? (<ProfileWrapper user={userData}/>) : (<Signup setUserData={setUserData}/>)}
            </div>
        </nav> 
        </>
    );
}

export default NavBar;