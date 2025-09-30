import { useNavigate } from "react-router-dom";
import { Card } from "./Card.jsx";
import "tailwindcss";
const LandPage = () => {
  const Nav = useNavigate();

  return (
    <>
  

      <div className="text-white text-center mt-10 text-4xl font-bold">
        <p className="text-4xl bg-black">© 2025 AInfinity. All rights reserved.</p>
        <p>code at github</p>
      </div>
    </>
  );
};

export default LandPage;
