import IITLogo  from "./../assets/images/general/IIT_logo_cropped.png"

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-black">
      <img
        src={IITLogo}
        alt="IIT Logo"
        className="w-24 h-24"
      />
      <p className="text-lg font-semibold tracking-wide">
        Loading
        <span className="animate-pulse"> .</span>
        <span className="animate-pulse delay-150">.</span>
        <span className="animate-pulse delay-300">.</span>
      </p>
    </div>
  );
};

export default Loader;
