import { useNavigate } from "react-router-dom";
import { Card } from "./Card.jsx";
import Features from "./Features.jsx";
// import "tailwindcss";
const LandPage = () => {
  const Nav = useNavigate();

  return (
    <>
  
      {/* <div className="text-white text-center mt-10 text-8xl font-bold bg-black">
        <p className="text-4xl bg-black">© 2025 AInfinity. All rights reserved.</p>
        <p>code at github</p>
      </div> */}
      <Features/>
    </>
  );
};

export default LandPage;
