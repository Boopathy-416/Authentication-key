// import { useEffect, useRef, useState } from "react";
// import { RefreshCcw, Volume2, VolumeX } from "lucide-react";
// import { gsap } from "gsap";
// import Login from "./Login";
// import Signup from "./Signup";

// export default function Hero() {
//   const [isMuted, setIsMuted] = useState(true);
//   const [activeForm, setActiveForm] = useState(null);
//   const videoRef = useRef(null);
//   const heroRef = useRef(null);
//   const formsContainerRef = useRef(null);

//   const toggleMute = () => {
//     if (videoRef.current) {
//       videoRef.current.muted = !isMuted;
//       setIsMuted(!isMuted);
//     }
//   };

//   const handleFormFocus = (form) => {
//     setActiveForm(form);
//   };

//   useEffect(() => {
//     if (heroRef.current && formsContainerRef.current) {
//       gsap.fromTo(heroRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5, ease: "power2.out" });
//       gsap.fromTo(
//         formsContainerRef.current,
//         { y: 50, opacity: 0 },
//         { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "back.out(1.7)" }
//       );

//       const createRays = () => {
//         const rays = document.createElement("div");
//         rays.className = "absolute inset-0 pointer-events-none";
//         for (let i = 0; i < 5; i++) {
//           const ray = document.createElement("div");
//           ray.className = "absolute w-full h-1 bg-violet-500/20 blur-xl";
//           ray.style.top = `${Math.random() * 100}%`;
//           ray.style.transform = `rotate(${Math.random() * 180}deg)`;
//           ray.style.transformOrigin = "center";
//           gsap.to(ray, {
//             opacity: 0.3 + Math.random() * 0.7,
//             duration: 2 + Math.random() * 3,
//             repeat: -1,
//             yoyo: true,
//             ease: "sine.inOut",
//           });
//           rays.appendChild(ray);
//         }
//         heroRef.current?.appendChild(rays);
//       };
//       createRays();
//     }
//   }, []);

//   return (
//     <div ref={heroRef} className="relative w-full h-screen overflow-hidden bg-black px-5">
//       <video ref={videoRef} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-50">
//         <source src="/mp4/Lica.mp4" type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//       <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-violet-950/50">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
//       </div>
//       <button
//         onClick={toggleMute}
//         className="absolute top-6 right-6 z-50 p-3 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white hover:bg-black/50 transition-all duration-300"
//         aria-label={isMuted ? "Unmute" : "Mute"}
//       >
//         {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
//       </button>
//       <div ref={formsContainerRef} className="absolute inset-0 flex items-center justify-center">
//         <div className="container max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
//           <div
//             className={`w-full md:w-1/2 max-w-md transition-all duration-500 ${activeForm === "signup" ? "opacity-30 blur-sm" : "opacity-100"}`}
//             onClick={() => handleFormFocus("login")}
//           >
//             <Login />
//           </div>
//           <RefreshCcw className="text-amber-50 " />
//           <div
//             className={`w-full md:w-1/2 max-w-md transition-all duration-500 ${activeForm === "login" ? "opacity-30 blur-sm" : "opacity-100"}`}
//             onClick={() => handleFormFocus("signup")}
//           >
//             {/* <SignupForm /> */}
//             <Signup />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// mobile responsive down here 
import { useEffect, useRef, useState } from "react";
import { RefreshCcw, Volume2, VolumeX } from "lucide-react";
import { gsap } from "gsap";
import Login from "./Login";
import Signup from "./Signup";

export default function Hero() {
  const [isMuted, setIsMuted] = useState(true);
  const [activeForm, setActiveForm] = useState(null);
  const videoRef = useRef(null);
  const heroRef = useRef(null);
  const formsContainerRef = useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFormFocus = (form) => {
    setActiveForm(form);
  };

  useEffect(() => {
    if (heroRef.current && formsContainerRef.current) {
      gsap.fromTo(heroRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5, ease: "power2.out" });
      gsap.fromTo(
        formsContainerRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "back.out(1.7)" }
      );
    }
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative w-full min-h-screen overflow-auto bg-black px-4 md:px-5"
    >
      {/* Background Video */}
      <video ref={videoRef} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-40 md:opacity-50">
        <source src="/mp4/Lica.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-violet-950/50"></div>

      {/* Mute Button */}
      <button
        onClick={toggleMute}
        className="absolute top-6 right-6 z-50 p-3 md:p-4 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white hover:bg-black/50 transition-all duration-300"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      {/* Forms Container */}
      <div ref={formsContainerRef} className="relative flex flex-col items-center justify-center min-h-screen py-8">
        <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
          {/* Login Form */}
          <div
            className={`w-full max-w-md transition-all duration-500 ${
              activeForm === "signup" ? "opacity-30 blur-sm" : "opacity-100"
            }`}
            onClick={() => handleFormFocus("login")}
          >
            <Login />
          </div>

          {/* Refresh Icon (Hidden on Mobile) */}
          <div className="hidden md:block">
            <RefreshCcw className="text-amber-50 text-2xl" />
          </div>

          {/* Signup Form */}
          <div
            className={`w-full max-w-md transition-all duration-500 ${
              activeForm === "login" ? "opacity-30 blur-sm" : "opacity-100"
            }`}
            onClick={() => handleFormFocus("signup")}
          >
            <Signup />
          </div>
        </div>
      </div>
    </div>
  );
}
