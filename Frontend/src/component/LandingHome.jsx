import { useNavigate } from "react-router-dom";
import { Card } from "./Card.jsx";

const LandPage = () => {
  const Nav = useNavigate();

  return (
    <>
      <section className="hero-section ">
        <div className="hero-content">
          <h1 className="hero-title">Meet Your AI Content Co-pilot</h1>
          <p className="hero-subtitle">
            Unlock your creative potential with our AI-powered content
            generation platform. Effortlessly craft compelling tweets,
            brainstorm innovative ideas, and produce engaging text for any
            purpose. Let our intelligent assistant be your partner in creation.
          </p>
          {/* The "Try Now" button in the hero section will always lead to Signin if the hero is shown */}
          <button
            className="hero-cta-button"
            onClick={() => {
              Nav("/home");
            }}
          >
            Try Now
          </button>
        </div>
        {/* Optional: You could add a visual element here like an image or SVG */}
        {/* <div className="hero-visual">
        <img src="/path-to-your-hero-image.svg" alt="AI assistant illustration" />
      </div> */}
      </section>
      <div className="container">

     
      <div className="card-section">
        <Card text="Helo wrold this is th bet we can do for you is that okkk ??
          This is wouldbe in the second lin e This is would be in teh third line"/>
        <Card text="Helo wrold this is th bet we can do for you is that okkk ??
          This is wouldbe in the second lin e This is would be in teh third line" />
        <Card  text="Helo wrold this is th bet we can do for you is that okkk ??
          This is wouldbe in the second lin e This is would be in teh third line"/>
        {/* <Card  text="Helo wrold this is th bet we can do for you is that okkk ??
          This is wouldbe in the second lin e This is would be in teh third line"/> */}
      </div>
       </div>

       <div className="footer">
        <p>© 2025 AInfinity. All rights reserved.</p>
        <p>code at github</p>
       </div>
    </>
  );
};

export default LandPage;
