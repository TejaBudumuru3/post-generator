import Profile from "./profile.jsx";
import ProfileWrapper from "./ProfileWrapper.jsx";
import Signup from "./Signup.jsx";

const NavBar = (props)=>{
    
    const user = props.name ? props.name : null;
    
    return(
        <>
        <nav className="Navbar" style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px", backgroundColor: "#6D28D9"}}>
            <div className="title">
                <h1 className="title-text">Post Generator</h1>
            </div>
            <div className="user">
                {user ? <ProfileWrapper {...props}/> : <Signup/>}
            </div>
        </nav> 
        </>
    );
}

export default NavBar;