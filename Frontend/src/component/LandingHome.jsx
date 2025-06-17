import {  useNavigate } from 'react-router-dom';

const LandPage = () => {
  const Nav = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Meet Your AI Content Co-pilot</h1>
        <p className="hero-subtitle">
          Unlock your creative potential with our AI-powered content generation platform.
          Effortlessly craft compelling tweets, brainstorm innovative ideas, and produce engaging text for any purpose.
          Let our intelligent assistant be your partner in creation.
        </p>
        {/* The "Try Now" button in the hero section will always lead to Signin if the hero is shown */}
        <button className="hero-cta-button" onClick={()=>{Nav("/home")}}>Try Now</button>
      </div>
      {/* Optional: You could add a visual element here like an image or SVG */}
      {/* <div className="hero-visual">
        <img src="/path-to-your-hero-image.svg" alt="AI assistant illustration" />
      </div> */}
    </section>
  );
}

export default LandPage;