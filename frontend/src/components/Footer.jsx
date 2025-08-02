import React from "react";
import {
  LogoFacebook,
  LogoGithub,
  LogoLinkedin,
  LogoTwitter,
} from "react-ionicons";
import Logo from "../assets/images/logo.svg";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-lime-700 to-lime-800 rounded-lg flex items-center justify-center">
                <div className="w-8 h-8 flex items-center justify-center ">
                  <img src={Logo} />
                </div>
              </div>
              <span className="text-xl font-bold">Gigconnect</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md text-wrap">
              The ultimate freelance marketplace connecting talented
              professionals with clients worldwide, creating opportunities that
              transform careers.
            </p>
          </div>
          <div className="w-full flex flex-col md:flex-row gap-3">
            <div>
              <h3 className="font-semibold ">Follow Us</h3>
              <div className="flex  flex-row gap-2">
                <a href="https://github.com/Laxman2546" target="_blank">
                  <div className="p-3 rounded-full hover:bg-white cursor-pointer">
                    <LogoGithub width="25px" height="25px" color="#3A5B22" />
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/in/lakshman-25L46"
                  target="_blank"
                >
                  <div className="p-3 rounded-full hover:bg-white cursor-pointer">
                    <LogoLinkedin width="25px" height="25px" color="#3A5B22" />
                  </div>
                </a>
                <a href="https://x.com" target="_blank">
                  <div className="p-3 rounded-full hover:bg-white cursor-pointer">
                    <LogoTwitter width="25px" height="25px" color="#3A5B22" />
                  </div>
                </a>
                <a href="https://facebook.com" target="_blank">
                  <div className="p-3 rounded-full hover:bg-white cursor-pointer">
                    <LogoFacebook width="25px" height="25px" color="#3A5B22" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Gigconnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
