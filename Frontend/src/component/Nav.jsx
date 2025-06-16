import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
const NavBar = ({children})=>{

    const Nav = useNavigate();

    // console.log("Userdata from Nav",userData)
    return( 
        <>
        <nav className="Navbar" style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px", backgroundColor: "rgb(10,10,10"}}>
            <div className="title">
                <h1 className="title-text" onClick={()=>{Nav("/")}}>Post Generator</h1>
            </div>
            {children}
        </nav> 
        </>
    );
}

export default NavBar;