const LandPage= ({setLandingBtn}) => {

  const buttonHandler = ()=>{
    
    setLandingBtn(false);
  }

  return (
    <>
    <div className="landing-section">
      <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit molestiae illum doloremque maiores nam labore! Repellendus dolores, vitae perferendis neque delectus totam nostrum magnam inventore asperiores, perspiciatis nam itaque! Harum!</h2>
      <button onClick={buttonHandler}>Try Now</button>
    </div>
    </>
    );

}
export default LandPage;