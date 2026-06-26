import React from "react";
import Logo from "../../assets/images/general/Logo.png"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-white sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-white sm:p-0">
        {children}
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-black lg:grid">
          <div className="relative flex items-center justify-center z-1">
            <div className="flex flex-col items-center">
                <img
                className="ml-10"
                  width={450}
                  height={450}
                  src={Logo}
                  alt="Logo"
                />
        
              {/* <p className="text-center text-gray-400 dark:text-white/60">
                Free and Open-Source Tailwind CSS Admin Dashboard Template
              </p> */}
            </div>
          </div>
        </div>
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
        </div>
      </div>
    </div>
  );
}
