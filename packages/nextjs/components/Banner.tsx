import { useEffect } from "react";
import DefaultFrameRender from "./DefaultFrameRender";
import { BanknotesIcon, BuildingStorefrontIcon, ChartBarIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

export const Banner = () => {
  useEffect(() => {
    // Load the particles.js script
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
    script.onload = () => {
      // @ts-ignore
      window?.particlesJS("particles-js", {
        particles: {
          number: {
            value: 100,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#B0E0E6",
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.7,
            random: true,
          },
          size: {
            value: 7,
            random: true,
          },
          move: {
            direction: "top",
            out_mode: "out",
            speed: 0.3,
            random: false,
            straight: false,
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "repulse",
            },
            onclick: {
              enable: false,
            },
          },
        },
        retina_detect: true,
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .gradient-card {
          background: linear-gradient(135deg, #ffd700, #90ee90, #ffb6c1);
          background-size: 200% 200%;
          animation: gradientMove 10s ease infinite;
          padding: 10px 20px;
          border-radius: 10px;
        }
      `}</style>
      {/* Particles.js container */}
      <div
        id="particles-js"
        style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}
      ></div>
      <div className="relative">
        <div className="container max-w-[90%] lg:py-12 py-0 xl:max-w-7xl xl:pl-4 m-auto pt-4 pb-8 flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-0 relative z-10">
          <div className="space-y-2 lg:max-w-[55%] flex flex-col items-center lg:items-start">
            <div className="relative">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-relaxed mb-4">
                Create Frames →<span className="block leading-relaxed">No &apos;coding&apos; required</span>
              </h1>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 pt-6">
              <div className="flex flex-col bg-base-100 p-4 items-center  text-center border border-black">
                <BuildingStorefrontIcon className="h-6 w-6 fill-secondary mb-2" />
                <p className="text-sm">
                  Create Frames using dashboard <b>and use templates for EZ</b>
                </p>
              </div>
              <div className="flex flex-col bg-base-100 p-4 items-center text-center border border-black">
                <GlobeAltIcon className="h-6 w-6 fill-secondary mb-2" />
                <p className="text-sm">
                  Advestise your products / goods and <b>go global with frames</b>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 pt-10">
              <div className="flex flex-col bg-base-100 p-4 items-center text-center border border-black">
                <BanknotesIcon className="h-6 w-6 fill-secondary mb-2" />
                <p className="text-sm">
                  Collect payments onchain using <b>onchain currency</b> on <b>any chain</b>
                </p>
              </div>
              <div className="flex flex-col bg-base-100 p-4 items-center text-center border border-black">
                <ChartBarIcon className="h-6 w-6 fill-secondary mb-2" />
                <p className="text-sm">
                  Track <b>analytics</b> and ship instantly <b>within seconds</b>
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 p-4 text-center">
            {/* Insert FRAME CODE here */}
            {/* <div className="gradient-card">
              <span className="text-center text-md lg:text-4xl text-black leading-normal">Example Frame 🖼 </span>
            </div> */}
            <div className="flex flex-col bg-base-100 p-4 items-center text-center border border-black mt-4">
              <DefaultFrameRender />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
