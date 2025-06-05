const LandPage= () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Top Content */}
      <div className="h-1/2 bg-white flex items-center justify-center z-10 relative">
        <h1 className="text-4xl font-bold text-gray-900">Top Content</h1>
      </div>

      {/* Wave SVG filling bottom half */}
      <div className="absolute bottom-0 w-full h-1/2">
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            fill="#6D28D9" // Indigo-700
            d="M0,128L80,154.7C160,181,320,235,480,240C640,245,800,203,960,176C1120,149,1280,139,1360,133.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>

    );

}
export default LandPage;