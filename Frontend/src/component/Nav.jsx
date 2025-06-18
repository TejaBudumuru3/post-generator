
import { useNavigate } from "react-router-dom";
const NavBar = ({children})=>{

    const Nav = useNavigate();

    return( 
        <>
        <nav className="Navbar">
            <div className="title">
                <h1 className="title-text" onClick={()=>{Nav("/")}}>Post Generator</h1>
            </div>
            {children}
        </nav> 
        </>
    );
}

export default NavBar;